import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./TicketDetails.scss";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import SeatContainer from "../../Components/SeatMaps/SeatsContainer";
import SmallPlane from "../../Components/SeatMaps/SmallPlane";
const TicketDetails = () => {
  // const [flightId, setFlightId] = useState();
  const { userFlightData, setUserFlightData } = useUserDataContext();
  const location = useLocation();
  const flightDetails = location.state?.flightDetails;

  return (
    <>
      <Navbar />
      <div className="ticket-details-wrapper">
        Detail <button onClick={console.log(1, flightDetails)}>Button</button>
        {flightDetails.details.arrivalLocation} -{" "}
        {flightDetails.details.leavingLocation}
        <div className="seat-test">
          <SeatContainer
            SeatMapComponent={SmallPlane}
            isBooking={true}
            flightDetails={flightDetails}
            // size={size}
          />
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
