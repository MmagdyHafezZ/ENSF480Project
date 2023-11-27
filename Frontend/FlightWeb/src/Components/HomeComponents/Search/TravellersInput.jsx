import React from "react";
import { startTransition } from "react";
import TravellerSelectPopup from "./TravellerSelectPopup.jsx";

const TravellersInput = ({
  label,
  travelerCount,
  setTravelerCount,
  popupState,
  togglePopup,
  refProp,
}) => {
  return (
    <div
      onClick={() => {
        startTransition(() => {
          togglePopup(); // Toggle the associated popup
        });
      }}
      className="searching-input"
    >
      <div
        className={`searching-input-placeholder ${
          travelerCount && "input-chosen"
        }`}
      >
        {label}
      </div>
      {travelerCount === 0 ? (
        <></>
      ) : (
        <div className="chosen-input">{travelerCount} travellers</div>
      )}
      {popupState && (
        <div ref={refProp}>
          <TravellerSelectPopup
            setTravellers={(selectedTravelers) => {
              setTravelerCount(selectedTravelers);
            }}
            setPopup={() => {
              togglePopup(); // Toggle the associated popup when closing
            }}
            travellers={travelerCount}
          />
        </div>
      )}
    </div>
  );
};

export default TravellersInput;
