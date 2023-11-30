import React, {
  lazy,
  useState,
  startTransition,
  useRef,
  useEffect,
} from "react";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import LocationInput from "./LocationInput.jsx";
const SearchLocationPopup = lazy(() => import("./SearchLocationPopup.jsx"));
import "./Search.scss";
import TravellerSelectPopup from "./TravellerSelectPopup.jsx";
import TravellersInput from "./TravellersInput.jsx";
import CalendarInput from "./CalendarInput.jsx";
import { formatDate } from "../../../utils/formatDate.js";
import { useUserDataContext } from "../../../context/UserDataContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Search = () => {
  const {
    userFlightData,
    setUserFlightData,
    setSearchState,
    isLoggedInContext,
    saveFlightDataTosessionStorage,
    handleButtonClick,
  } = useUserDataContext();
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   localStorage.getItem("isLoggedIn") || false
  // );
  const navigate = useNavigate();

  const [popupStates, setPopupStates] = useState({
    leavingTo: false,
    goingTo: false,
    travellers: false,
    calendar: false,
  });

  const [locations, setLocations] = useState({ origin: "", destination: "" });
  const [travelDates, setTravelDates] = useState({
    departing: new Date(),
    returning: "",
  });
  const [isDepartActive, setIsDepartActive] = useState(true);
  const [switchLocation, setSwitchLocation] = useState(false);
  const [searchingPopup, setSearchingPopup] = useState(false);
  const [travellers, setTravellers] = useState(0);

  const [sendData, setSendData] = useState({});

  const refs = {
    origin: useRef(null),
    destination: useRef(null),
    travellers: useRef(null),
    calendar: useRef(null),
  };
  const togglePopup = (popup) => {
    setPopupStates((prev) => ({
      ...{ leavingTo: false, goingTo: false, travellers: false }, // Set all popups to false initially
      [popup]: !prev[popup], // Then toggle the state of the clicked popup
    }));
  };

  const openCalendarPopup = (isDepart) => {
    setIsDepartActive(isDepart);
    togglePopup("calendar");
  };
  const closeAllPopups = () =>
    setPopupStates({ leavingTo: false, goingTo: false, travellers: false });

  const handleOutsideClick = (event) => {
    Object.keys(refs).forEach((key) => {
      if (refs[key].current && !refs[key].current.contains(event.target)) {
        setPopupStates((prev) => ({ ...prev, [key]: false }));
      }
    });
  };

  useEffect(() => {
    const activePopup = Object.values(popupStates).some((value) => value);
    if (activePopup) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener(
        "keydown",
        (event) => event.key === "Escape" && closeAllPopups()
      );
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleOutsideClick);
    };
  }, [popupStates]);

  const handleSwitchLocations = () => {
    setLocations((prevLocations) => ({
      origin: prevLocations.destination,
      destination: prevLocations.origin,
    }));
    setSwitchLocation((prev) => !prev);
  };

  const updateUserFlightData = () => {
    setUserFlightData({
      ...userFlightData, // Keep existing data
      origin: locations.origin,
      destination: locations.destination,
      travellers: travellers.toString(),
      departing: formatDate(travelDates.depart),
      returning: formatDate(travelDates.returning),
      
    });
  };

  const isAllDummyFilled = () => {
    // Check if all fields in userFlightData are not empty
    return Object.values(userFlightData).every(
      (value) => value !== "" && value !== null
    );
  };

  const handleSendData = (userData) => {
    setSendData({
      iataorigin : userData.leaving.iata,
      iatadest : userData.going.iata,
      travellers : userData.travellers,
      departing : userData.depart,
      returning : userData.return
    });
  };

  const handlePostSearchBooking = async () => {
    try{
      const response = await
        axios
          .post(`http://localhost:8080/postSearchBooking`, sendData);
      if(response.status !== 200 || response.status !== 201){
        console.log("Error adding search booking: ", response.data);
      }
    } catch (error) {
      console.error("Error adding booking: ", error);
    }
  }

  // Function to update URL with userFlightData

  const handleSearchFlight = () => {
    // apiFlight = createAPIData(userFlightData);
    setSearchState((prev) => !prev); // Toggle search state
    handleButtonClick();
    handlePostSearchBooking();
    navigate("/flights", { state: { userFlightData, sendData } });
    
  };



  return (
    <div className="search container section">
      <div className="sectionContainer grid">
        <div className="main-search-container searchInputs flex">
          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Location</h4>
              <div className="flex choose-locations">
                <LocationInput
                  label="Leaving From"
                  type="leaving"
                  value={userFlightData}
                  setData={setUserFlightData}
                  popupState={popupStates.leavingTo}
                  togglePopup={() => togglePopup("leavingTo")}
                  refProp={refs.origin}
                />
                <div
                  onClick={handleSwitchLocations}
                  className={`location-arrow-icon-container`}
                >
                  <FaArrowRightArrowLeft
                    className={`location-arrow-icon ${
                      switchLocation ? "flip-arrow" : ""
                    }`}
                  />
                </div>
                <LocationInput
                  label="Going To"
                  type="going"
                  value={userFlightData}
                  setData={setUserFlightData}
                  popupState={popupStates.goingTo}
                  togglePopup={() => togglePopup("goingTo")}
                  refProp={refs.destination}
                />
              </div>
            </div>
          </div>

          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <RiAccountPinCircleLine className="icon" />
            </div>
            <div className="texts">
              <h4>Travelers</h4>
              <TravellersInput
                label="Add Travellers"
                popupState={popupStates.travellers}
                value={userFlightData}
                setData={setUserFlightData}
                togglePopup={() => togglePopup("travellers")}
                refProp={refs.travellers}
              />
            </div>
          </div>

          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <RxCalendar className="icon" />
            </div>
            <div className="texts">
              <h4>Depart and Return</h4>
              <CalendarInput
                label="Dates"
                value={userFlightData}
                setData={setUserFlightData}
                popupState={popupStates.calendar}
                togglePopup={() => togglePopup("calendar")}
                refProp={refs.calendar}
              />
            </div>
          </div>
          <button
            onClick={() => {
              handleSendData(userFlightData);
              console.log(sendData);
              handleSearchFlight();
            }}
            className="search-flight-button btn btnBlock flex"
            disabled={!isAllDummyFilled()}
          >
            Search Flight
          </button>
        </div>
      </div>
    </div>
  );
};
export default Search;
