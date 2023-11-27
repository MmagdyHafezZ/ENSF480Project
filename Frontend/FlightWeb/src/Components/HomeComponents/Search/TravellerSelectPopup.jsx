import React from "react";
import { useUserDataContext } from "../../../context/UserDataContext.jsx";
export default function TravelerSelectPopup({
  setTravellers,
  setPopup,
  travellers,
  value,
  setData,
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
            onClick={() =>
              setData((prevData) => ({
                ...prevData,
                travellers: Math.max(prevData.travellers - 1, 0),
              }))
            }
            className="select-travellers-container__btns__button"
          >
            -
          </span>
          <span className="number-of-travellers">{value.travellers}</span>
          <span
            onClick={() =>
              setData((prevData) => ({
                ...prevData,
                travellers: prevData.travellers + 1,
              }))
            }
            className="select-travellers-container__btns__button"
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
}
