import React, { startTransition } from "react";
import CalendarPopup from "./CalendarPopup";
import { useUserDataContext } from "../../../context/UserDataContext.jsx";
import { format } from "date-fns";
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
    if (!date) return "";
    const formattedDate = format(date, "MM/dd");
    return formattedDate;
  };
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
      {value.return != "" ? (
        <div className="chosen-input">
          {" "}
          {formatDate(value.depart)} - {formatDate(value.return)}
        </div>
      ) : (
        <></>
      )}
      {popupState && (
        <div ref={refProp}>
          <CalendarPopup
            value={value}
            setData={setData}
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
