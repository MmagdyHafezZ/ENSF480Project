import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import Navbar from "../../Components/Navbar/Navbar";
import Search from "../../Components/HomeComponents/Search/Search";
import "./flights.scss";
import FlightsList from "./FlightsList";

const FlightsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State declaration
  const { userFlightData, searchState } = useUserDataContext();
  console.log("STATE", searchState);
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

            <FlightsList />
          </div>
          <div className="flights-main__right">Right</div>
        </div>
      </div>
    </>
  );
};

export default FlightsPage;
