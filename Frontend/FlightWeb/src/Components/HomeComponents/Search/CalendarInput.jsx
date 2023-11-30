import React, { startTransition } from "react";
import CalendarPopup from "./CalendarPopup";
import { useUserDataContext } from "../../../context/UserDataContext.jsx";
import { format, isValid } from "date-fns";
const CalendarInput = ({
  label,
  onChange,
  popupState,
  togglePopup,
  refProp,
  value,
  setData,
}) => {
  const formatDate = (date) => {
    if (!date || !isValid(new Date(date))) return ""; // Check for invalid dates
    const formattedDate = format(new Date(date), "MM/dd");
    return formattedDate;
  };
  console.log();
  if (value.return) {
    // console.log("vale", value);
  }

  return (
    <div
      onClick={() => {
        startTransition(() => {
          togglePopup(); // Toggle the associated popup
        });
      }}
      className={`searching-input ${value.return ? "input-chosen" : ""}`}
    >
      <div className={`searching-input-placeholder ${value.return}`}>
        {label}
      </div>
      {value.return && isValid(new Date(value.return)) ? (
        <div className="chosen-input">
          {formatDate(value.depart)} - {formatDate(value.return)}
        </div>
      ) : (
        <></>
      )}
      <div ref={refProp}>
        {" "}
        <CalendarPopup
          value={value}
          setData={setData}
          onChange={onChange}
          togglePopup={togglePopup}
          label={label}
          popupState={popupState}
        />
      </div>
    </div>
  );
};

export default CalendarInput;
