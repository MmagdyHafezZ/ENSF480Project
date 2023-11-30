import React from "react";
import { useUserDataContext } from "../../../context/UserDataContext.jsx";
export default function TravelerSelectPopup({
  setTravellers,
  setPopup,
  travellers,
  value,
  setData,
  popupState,
  ref,
}) {
  const handlePopupClick = (event) => {
    event.stopPropagation(); // This stops the click event from reaching the parent
  };

  return (
    <div
      ref={ref}
      className={`searching-popup ${popupState ? "popup-active" : ""}`}
      onClick={handlePopupClick}
    >
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
