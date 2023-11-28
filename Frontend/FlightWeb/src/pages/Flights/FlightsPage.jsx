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
  const updateUserFlightDataInUrl = (data) => {
    const params = new URLSearchParams();
    console.log("data", data);
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "object") {
        if (key === "depart" || key === "return") {
          const date = new Date(data[key]);
          const formattedDate = date.toISOString().split("T")[0]; // Converts to yyyy-mm-dd format
          params.set(key, formattedDate);
        } else {
          console.log("IT IS OBJECt", data);
          console.log("key", key);
          Object.keys(data[key]).forEach((subKey) => {
            console.log(data[key]);
            params.set(`${key}.${subKey}`, data[key][subKey]);
          });
        }
      } else {
        console.log("key", key);

        params.set(key, data[key]);
      }
    });

    setSearchParams(params);
    console.log("URL Updated with:", data);
  };

  // Effect to sync userFlightData with URL
  useEffect(() => {
    // Ensure userFlightData is not empty
    if (userFlightData && userFlightData.depart) {
      console.log("there is data", userFlightData);
      updateUserFlightDataInUrl(userFlightData);
    }
  }, [userFlightData]);

  // Effect to restore userFlightData from URL on mount/refresh
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
          name: params["leaving.name"] || "",
          iata: params["leaving.iataCode"] || "",
        },
        going: {
          name: params["going.name"] || "",
          iata: params["going.iataCode"] || "",
        },
        travellers: params["travellers"] || 0,
        depart: params["depart"] ? new Date(params["depart"]) : "", // Converts back to Date object
        return: params["return"] ? new Date(params["return"]) : "", // Converts back to Date object
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