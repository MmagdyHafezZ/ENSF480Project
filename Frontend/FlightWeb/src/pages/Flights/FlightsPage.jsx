import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import Navbar from "../../Components/Navbar/Navbar";
import Search from "../../Components/HomeComponents/Search/Search";
import "./flights.scss";
import FlightsList from "./FlightsList";
import ErrorComponent from "../../Components/ErrorPage/ErrorComponent";

const FlightsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const state = location.state;
  // State declaration
  const { searchState, isLoggedIn } = useUserDataContext();

  const { userFlightData, sendData } = location.state || {};

  if (!userFlightData.return && !userFlightData.leaving.city) {
    return (
      <>
        <ErrorComponent />
      </>
    );
  }
  console.log(userFlightData);

  return (
    <>
      <Navbar />
      <div className="flights-wrapper flex container">
        <Search />
        {/* <button onClick = {()=>{console.log(userFlightData)}} */}
        {/* {userFlightData.leaving.name} */}
        <div className="flights-main-container flex">
          {/* <div className="flights-main__left">Left</div> */}
          <div className="flights-list__container">
            {/* List of Flights Here */}

            <FlightsList userFlightData={userFlightData} sendData={sendData} />
          </div>
          {/* <div className="flights-main__right">Right</div> */}
        </div>
      </div>
    </>
  );
};

export default FlightsPage;
