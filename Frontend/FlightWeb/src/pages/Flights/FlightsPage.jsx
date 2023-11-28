import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import Navbar from "../../Components/Navbar/Navbar";
import Search from "../../Components/HomeComponents/Search/Search";
import "./flights.scss";
import FlightsList from "./FlightsList";

const FlightsPage = () => {
  const { userFlightData, setUserFlightData } = useUserDataContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to update URL with userFlightData
  // const updateUserFlightDataInUrl = (data) => {
  //   const params = new URLSearchParams();

  //   Object.keys(data).forEach((key) => {
  //     if (typeof data[key] === "object") {
  //       if (key === "depart" || key === "return") {
  //         const date = new Date(data[key]);
  //         const formattedDate = date.toISOString().split("T")[0]; // Converts to yyyy-mm-dd format
  //         params.set(key, formattedDate);
  //       } else {
  //         Object.keys(data[key]).forEach((subKey) => {
  //           params.set(`${key}.${subKey}`, data[key][subKey]);
  //         });
  //       }
  //     } else {
  //       params.set(key, data[key]);
  //     }
  //   });

  //   setSearchParams(params);
  //   console.log("URL Updated with:", data);
  // };

  // // Effect to sync userFlightData with URL
  // useEffect(() => {
  //   // Ensure userFlightData is not empty
  //   if (userFlightData && userFlightData.depart) {
  //     updateUserFlightDataInUrl(userFlightData);
  //   }
  // }, [userFlightData]);

  // Effect to restore userFlightData from URL on mount/refresh
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    console.log("URL Params on Load:", params);

    if (
      Object.keys(params).length > 0 &&
      userFlightData &&
      !userFlightData.depart
    ) {
      const restoredData = {
        leaving: {
          name: params["leaving.name"] || "",
          iata: params["leaving.iata"] || "",
        },
        going: {
          name: params["going.name"] || "",
          iata: params["going.iata"] || "",
        },
        travellers: params["travellers"] || 0,
        depart: params["depart"]
          ? new Date(params["depart"] + "T00:00:00")
          : "", // Adjusted for timezone
        return: params["return"]
          ? new Date(params["return"] + "T00:00:00")
          : "", // Adjusted for timezone
      };
      setUserFlightData(restoredData);
      console.log("Restored Data:", restoredData);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flights-wrapper flex container">
        <Search />
        {userFlightData.leaving.name}
        <div className="flights-main-container flex">
          {/* <div className="flights-main__left">Left</div> */}
          <div className="flights-list__container">
            {/* List of Flights Here */}
            <FlightsList searchParams={searchParams} />
          </div>
          <div className="flights-main__right">Right</div>
        </div>
      </div>
    </>
  );
};

export default FlightsPage;
