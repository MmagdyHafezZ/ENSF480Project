import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./TicketDetails.scss";
import { useSearchParams } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
const TicketDetails = () => {
  // const [flightId, setFlightId] = useState();
  const { userFlightData, setUserFlightData } = useUserDataContext();

  return (
    <>
      <Navbar />

      <div className="ticket-details-wrapper">
        Detail{" "}
        <button onClick={console.log(1, userFlightData, flightId)}>
          Button
        </button>
      </div>
    </>
  );
};

export default TicketDetails;
