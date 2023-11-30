import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CalendarPopup = ({
  value,
  onChange,
  togglePopup,
  label,
  setData,
  popupState,
  ref,
}) => {
  console.log("hello", value);
  const handlePopupClick = (event) => {
    event.stopPropagation(); // This stops the click event from reaching the parent
  };
  const handleDateChange = (dates) => {
    const [start, end] = Array.isArray(dates) ? dates : [dates, value.return];
    console.log();
    setData((prevData) => ({
      ...prevData,
      depart: start,
      return: end,
    }));
  };
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);

    return formattedDate;
  };

  const formattedDepartDate = formatDate(value.depart);
  const formattedReturnDate = formatDate(value.return);
  console.log("VALUESS", value);

  return (
    <div
      ref={ref}
      onClick={handlePopupClick}
      className={`searching-popup ${popupState ? "popup-active" : ""}`}
    >
      <button onClick={togglePopup}>close</button>
      <DatePicker
        selected={value.depart}
        onChange={handleDateChange}
        startDate={value.depart}
        endDate={value.return}
        selectsRange
        minDate={new Date()}
        inline
      />
    </div>
  );
};

export default CalendarPopup;
