import React from "react";
import MediumPlane from "./MediumPlane";
// import "./planeContainer.scss";
import "./SeatsContainer.scss";

const SeatContainer = ({ SeatMapComponent, isBooking }) => {
  //   console.log(size);
  return (
    <div className="seat-map-wrapper">
      <div className={`seat-map-container `}>
        {/* <span>{size}</span> */}
        <SeatMapComponent isBooking={isBooking} />
      </div>
    </div>
  );
};

export default SeatContainer;
