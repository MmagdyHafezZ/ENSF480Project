import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./TicketDetails.scss";
import { useSearchParams } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
const TicketDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [flightId, setFlightId] = useState();
  const { userFlightData, setUserFlightData } = useUserDataContext();
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    console.log("URL Params on Load:", params);
    console.log(Object.keys(params).length > 0);
    console.log(!userFlightData);
    console.log(!userFlightData.depart);
    if (
      Object.keys(params).length > 0 &&
      userFlightData &&
      !userFlightData.depart
    ) {
      const restoredData = {
        leaving: {
          city: params["leaving.city"] || "",
          iata: params["leaving.iataCode"] || "",
        },
        going: {
          city: params["going.city"] || "",
          iata: params["going.iataCode"] || "",
        },
        travellers: params["travellers"] || 0,
        depart: params["depart"] ? new Date(params["depart"]) : "", // Converts back to Date object
        return: params["return"] ? new Date(params["return"]) : "", // Converts back to Date object
      };
      setUserFlightData(restoredData);
      setFlightId(params["flight_id"]);
      console.log("Restored Data:", restoredData);
    }
  }, []);
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
