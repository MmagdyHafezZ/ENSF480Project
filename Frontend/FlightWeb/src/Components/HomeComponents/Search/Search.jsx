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
const Search = () => {
  const { userFlightData, setUserFlightData } = useUserDataContext();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );

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
  const isAllDataFilled = () => {
    return Object.values({ ...locations, travellers, ...travelDates }).every(
      (value) => value !== "" && value !== null && value !== undefined
    );
  };
  const isAllDummyFilled = () => {
    // Check if all fields in userFlightData are not empty
    console.log(userFlightData);
    return Object.values(userFlightData).every(
      (value) => value !== "" && value !== null
    );
  };
  return (
    <div className="search container section">
      <div className="sectionContainer grid">
        {/* <div className="btns flex">
          <div className="singleBtn">
            <span>Economy</span>
          </div>
          <div className="singleBtn">
            <span>Business Class</span>
          </div>
          <div className="singleBtn">
            <span>First Class</span>
          </div>
        </div> */}

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
                  location={locations.leaving}
                  setLocation={(location) => {
                    setLocations((prevLocations) => ({
                      ...prevLocations,
                      leaving: location,
                    }));
                  }}
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
                  location={locations.going}
                  setLocation={(location) => {
                    setLocations((prevLocations) => ({
                      ...prevLocations,
                      going: location,
                    }));
                  }}
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
                travelerCount={travellers}
                setTravelerCount={(selectedTravelers) => {
                  setTravellers(selectedTravelers);
                }}
                popupState={popupStates.travellers}
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
                value={travelDates}
                onChange={setTravelDates}
                popupState={popupStates.calendar}
                togglePopup={() => togglePopup("calendar")}
                refProp={refs.calendar}
              />
            </div>
          </div>
          <button
            onClick={() => {
              updateUserFlightData();
              setSearchingPopup(true);
            }}
            className="search-flight-button btn btnBlock flex"
            disabled={!isAllDataFilled()}
          >
            Search Flight
          </button>
          {searchingPopup && isAllDummyFilled() && (
            <div className="search-pop">
              <div>
                Leaving: {userFlightData.leaving.name},{" "}
                {userFlightData.leaving.iataCode}
              </div>
              <div>
                Going To: {userFlightData.going.name},{" "}
                {userFlightData.going.iataCode}
              </div>
              <div>Travellers: {userFlightData.travellers}</div>
              <div>Depart: {userFlightData.depart}</div>
              <div>Return: {userFlightData.return}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
