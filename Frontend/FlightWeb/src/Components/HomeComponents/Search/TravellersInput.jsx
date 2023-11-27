import React from "react";
import { startTransition } from "react";
import TravellerSelectPopup from "./TravellerSelectPopup.jsx";
import { useUserDataContext } from "../../../context/UserDataContext.jsx";
const TravellersInput = ({
  label,

  popupState,
  togglePopup,
  refProp,
  setData,
  value,
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
          value.travellers && "input-chosen"
        }`}
      >
        {label}
      </div>
      {value.travellers === 0 ? (
        <></>
      ) : (
        <div className="chosen-input">{value.travellers}</div>
      )}
      {popupState && (
        <div ref={refProp}>
          <TravellerSelectPopup
            value={value}
            setData={setData}
            setPopup={() => {
              togglePopup(); // Toggle the associated popup when closing
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TravellersInput;
