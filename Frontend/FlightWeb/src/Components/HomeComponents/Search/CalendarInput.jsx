import React, { startTransition } from "react";
import CalendarPopup from "./CalendarPopup";
const CalendarInput = ({
  label,
  value,
  onChange,
  popupState,
  togglePopup,
  refProp,
}) => {
  const formatDate = (date) => {
    if (!date) return "";

    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString(); // Month is 0-indexed
    let year = date.getFullYear().toString().substr(-2); // Get last two digits

    day = day.length < 2 ? "0" + day : day;
    month = month.length < 2 ? "0" + month : month;

    return `${month}/${day}`;
  };

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
      {value.return != "" ? (
        <div className="chosen-input">
          {value.depart ? formatDate(value.depart) : ""}-
          {value.return ? formatDate(value.return) : ""}
        </div>
      ) : (
        <></>
      )}
      {popupState && (
        <div ref={refProp}>
          <CalendarPopup
            value={value}
            onChange={onChange}
            togglePopup={togglePopup}
            label={label}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
