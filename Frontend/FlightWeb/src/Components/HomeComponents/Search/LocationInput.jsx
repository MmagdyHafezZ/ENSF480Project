import React from "react";
import { startTransition } from "react";
import SearchLocationPopup from "./SearchLocationPopup.jsx";
import { useUserDataContext } from "../../../context/UserDataContext.jsx";
const LocationInput = ({
  label,
  popupState,
  togglePopup,
  refProp,
  type,
  value,
  setData,
}) => {
  const { userFlightData, setUserFlightData } = useUserDataContext();
  // console.log(userFlightData[type] && userFlightData[type]);
  return (
    <span
      onClick={() => {
        startTransition(() => {
          togglePopup(); // Toggle the associated popup
        });
      }}
      className="location-input"
    >
      <div
        className={`location-input-placeholder ${value[type] && "chose-city"}`}
      >
        {label}
      </div>
      {value[type] && <div className="chosen-location">{value[type].name}</div>}

      {popupState && (
        <div ref={refProp}>
          <SearchLocationPopup
            placeholder={label}
            type={type}
            value={value}
            setData={setData}
            setPopup={() => {
              togglePopup(); // Toggle the associated popup when closing
            }}
          />
        </div>
      )}
    </span>
  );
};

export default LocationInput;
