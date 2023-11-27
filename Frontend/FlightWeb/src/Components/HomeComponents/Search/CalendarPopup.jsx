import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CalendarPopup = ({ value, onChange, togglePopup, label, setData }) => {
  const handlePopupClick = (event) => {
    event.stopPropagation(); // This stops the click event from reaching the parent
  };
  const handleDateChange = (dates) => {
    const [start, end] = Array.isArray(dates) ? dates : [dates, value.return];
    setData((prevData) => ({
      ...prevData,
      depart: start,
      return: end,
    }));
  };
  return (
    <div onClick={handlePopupClick} className="searching-popup">
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
