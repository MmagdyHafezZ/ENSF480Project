import React from "react";
import MediumPlane from "./MediumPlane";
// import "./planeContainer.scss";
import "./SeatsContainer.scss";

const SeatContainer = ({ SeatMapComponent, isBooking, flightDetails }) => {
  //   console.log(size);
  return (
    <div className="seat-map-wrapper">
      <div className={`seat-map-container `}>
        {/* <span>{size}</span> */}
        <SeatMapComponent isBooking={isBooking} flightDetails={flightDetails} />
      </div>
    </div>
  );
};

export default SeatContainer;
