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
const Search = () => {
  const {
    userFlightData,
    setUserFlightData,
    saveFlightDataToLocalStorage,
    searchState,
    setSearchState,
  } = useUserDataContext();

  useEffect(() => {
    // Retrieve the userFlightData from localStorage
    const storedData = localStorage.getItem("userFlightData");
    if (storedData) {
      setUserFlightData(JSON.parse(storedData));
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const navigate = useNavigate();

  const [popupStates, setPopupStates] = useState({
    leavingTo: false,
    goingTo: false,
    travellers: false,
    calendar: false,
  });

  const [locations, setLocations] = useState({ leaving: "", going: "" });
  const [travelDates, setTravelDates] = useState({
    depart: new Date(),
    return: "",
  });
  const [isDepartActive, setIsDepartActive] = useState(true);
  const [switchLocation, setSwitchLocation] = useState(false);
  const [searchingPopup, setSearchingPopup] = useState(false);
  const [travellers, setTravellers] = useState(0);
  const refs = {
    leaving: useRef(null),
    going: useRef(null),
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
      leaving: prevLocations.going,
      going: prevLocations.leaving,
    }));
    setSwitchLocation((prev) => !prev);
  };

  const updateUserFlightData = () => {
    setUserFlightData({
      ...userFlightData, // Keep existing data
      leaving: locations.leaving,
      going: locations.going,
      travellers: travellers.toString(),
      depart: formatDate(travelDates.depart),
      return: formatDate(travelDates.return),
    });
  };

  const isAllDummyFilled = () => {
    // Check if all fields in userFlightData are not empty
    return Object.values(userFlightData).every(
      (value) => value !== "" && value !== null
    );
  };

  // Function to update URL with userFlightData

  const handleSearchFlight = () => {
    setSearchState((prev) => !prev);
    // localStorage.setItem("userFlightData", JSON.stringify(userFlightData));
    const updatedUserFlightData = { ...userFlightData };
    // Update userFlightData with the copy
    setUserFlightData(userFlightData);
    saveFlightDataToLocalStorage();
    navigate("/flights");
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
                  refProp={refs.leaving}
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
                  refProp={refs.going}
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
              // updateUserFlightData();
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
