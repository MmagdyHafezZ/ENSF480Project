import React from "react";
import { startTransition } from "react";
import SearchLocationPopup from "./SearchLocationPopup.jsx";

const LocationInput = ({
  label,
  location,
  setLocation,
  popupState,
  togglePopup,
  refProp,
}) => {
  return (
    <span
      onClick={() => {
        startTransition(() => {
          togglePopup(); // Toggle the associated popup
        });
      }}
      className="location-input"
    >
      <div className={`location-input-placeholder ${location && "chose-city"}`}>
        {label}
      </div>
      {location && <div className="chosen-location">{location.name}</div>}

      {popupState && (
        <div ref={refProp}>
          <SearchLocationPopup
            placeholder={label}
            setLocation={(selectedLocation) => {
              setLocation(selectedLocation);
            }}
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
