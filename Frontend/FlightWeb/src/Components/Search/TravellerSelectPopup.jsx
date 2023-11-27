import React from "react";

export default function TravelerSelectPopup({
  setTravellers,
  setPopup,
  travellers,
}) {
  const handlePopupClick = (event) => {
    event.stopPropagation(); // This stops the click event from reaching the parent
  };
  return (
    <div className="searching-popup" onClick={handlePopupClick}>
      <div className="flex select-travellers-container">
        <span>Adults</span>
        <div className="flex select-travellers-container__btns">
          <span
            onClick={() => setTravellers((prev) => Math.max(prev - 1, 0))}
            className="select-travellers-container__btns__button"
          >
            -
          </span>
          <span className="number-of-travellers">{travellers}</span>
          <span
            onClick={() => setTravellers((prev) => prev + 1)}
            className="select-travellers-container__btns__button"
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
}
