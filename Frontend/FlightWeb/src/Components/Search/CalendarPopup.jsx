import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CalendarPopup = ({ value, onChange, togglePopup, label }) => {
  const handlePopupClick = (event) => {
    event.stopPropagation(); // This stops the click event from reaching the parent
  };
  const handleDateChange = (dates) => {
    // Check if 'dates' is an array (range selection)
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      onChange({ depart: start, return: end });
    } else {
      // If 'dates' is not an array, it's a single date selection
      onChange({ ...value, depart: dates });
    }
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
