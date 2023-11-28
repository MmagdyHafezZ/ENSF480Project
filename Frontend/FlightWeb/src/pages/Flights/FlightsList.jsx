import React from "react";
import "./flights.scss";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const FlightsList = () => {
  const navigate = useNavigate();
  const { userFlightData } = useUserDataContext();
  const flightsData = [
    {
      id: "1",
      details: {
        airline: "Air Canada",
        departingTime: "2023-11-29T16:30:00", // 4:30pm in 24-hour format
        arrivingTime: "2023-11-29T19:30:00", // 7:30pm in 24-hour format
        departureLocation: "Calgary",
        arrivalLocation: "Vancouver",
        leavingTime: "2023-11-30T14:30:00", // 2:30pm next day
        arriveBackTime: "2023-11-30T17:30:00", // 5:30pm next day
        leavingLocation: "Vancouver",
        arriveBackLocation: "Calgary",
        price: "89$",
        seatCapacity: 32,
      },
    },
    {
      id: "2",
      details: {
        airline: "United Airlines",
        departingTime: "2023-11-29T18:00:00", // 6:00pm in 24-hour format
        arrivingTime: "2023-11-29T21:00:00", // 9:00pm in 24-hour format
        departureLocation: "Los Angeles, CA",
        arrivalLocation: "New York, NY",
        leavingTime: "2023-11-30T14:30:00", // 2:30pm on the return date
        arriveBackTime: "2023-11-30T17:30:00", // 5:30pm on the return date
        leavingLocation: "New York, NY",
        arriveBackLocation: "Los Angeles, CA",
        price: "120$",
        seatCapacity: 12,
      },
    },
    {
      id: "3",
      details: {
        airline: "British Airways",
        departingTime: "2023-11-29T10:00:00", // 10:00am in 24-hour format
        arrivingTime: "2023-11-29T14:00:00", // 2:00pm in 24-hour format
        departureLocation: "London, UK",
        arrivalLocation: "Paris, FR",
        leavingTime: "2023-11-30T14:30:00", // 2:30pm on the return date
        arriveBackTime: "2023-11-30T17:30:00", // 5:30pm on the return date
        leavingLocation: "Paris, FR",
        arriveBackLocation: "London, UK",
        price: "75£",
        seatCapacity: 68,
      },
    },
    {
      id: "4",
      details: {
        airline: "WestJet",
        departingTime: "2023-11-29T08:00:00",
        arrivingTime: "2023-11-29T09:15:00",
        departureLocation: "Calgary",
        arrivalLocation: "Fort McMurray",
        leavingTime: "2023-11-30T10:00:00", // Added fictional time
        arriveBackTime: "2023-11-30T11:15:00", // Added fictional time
        leavingLocation: "Fort McMurray", // Added return location
        arriveBackLocation: "Calgary", // Added return location
        price: "110$",
        seatCapacity: 53,
      },
    },
    {
      id: "5",
      details: {
        airline: "Air Canada",
        departingTime: "2023-11-29T12:30:00",
        arrivingTime: "2023-11-29T13:45:00",
        departureLocation: "Calgary",
        arrivalLocation: "Fort McMurray",
        leavingTime: "2023-11-30T14:00:00", // Added fictional time
        arriveBackTime: "2023-11-30T15:15:00", // Added fictional time
        leavingLocation: "Fort McMurray", // Added return location
        arriveBackLocation: "Calgary", // Added return location
        price: "120$",
        seatCapacity: 23,
      },
    },
    {
      id: "6",
      details: {
        airline: "WestJet",
        departingTime: "2023-11-28T18:00:00",
        arrivingTime: "2023-11-28T19:15:00",
        departureLocation: "Calgary",
        arrivalLocation: "Fort McMurray",
        leavingTime: "2023-11-30T19:00:00", // Added fictional time
        arriveBackTime: "2023-11-30T20:15:00", // Added fictional time
        leavingLocation: "Fort McMurray", // Added return location
        arriveBackLocation: "Calgary", // Added return location
        price: "115$",
        seatCapacity: 32,
      },
    },
    {
      id: "7",
      details: {
        airline: "Air Canada",
        departingTime: "2023-11-30T21:00:00",
        arrivingTime: "2023-11-30T22:15:00",
        departureLocation: "Calgary",
        arrivalLocation: "Fort McMurray",
        leavingTime: "2023-12-4T22:00:00", // Added fictional time
        arriveBackTime: "2023-12-4T23:15:00", // Added fictional time
        leavingLocation: "Fort McMurray", // Added return location
        arriveBackLocation: "Calgary", // Added return location
        price: "130$",
        seatCapacity: 19,
      },
    },
    {
      id: "8",
      details: {
        airline: "WestJet",
        departingTime: "2023-11-29T07:00:00", // 7:00am in 24-hour format
        arrivingTime: "2023-11-29T07:50:00", // 7:50am in 24-hour format
        departureLocation: "Calgary",
        arrivalLocation: "Vancouver",
        leavingTime: "2023-11-30T11:00:00", // Added fictional time
        arriveBackTime: "2023-11-30T11:50:00", // Added fictional time
        leavingLocation: "Vancouver", // Added return location
        arriveBackLocation: "Calgary", // Added return location
        price: "99$",
        seatCapacity: 42,
      },
    },
    {
      id: "9",
      details: {
        airline: "Air Canada",
        departingTime: "2023-12-4T00:00:00",
        arrivingTime: "2023-12-4T00:00:00",
        departureLocation: "Calgary",
        arrivalLocation: "Vancouver",
        leavingTime: "2023-12-8T00:00:00", // Added fictional time
        arriveBackTime: "2023-12-8T00:00:00", // Added fictional time
        leavingLocation: "Vancouver", // Added return location
        arriveBackLocation: "Calgary", // Added return location
        price: "105$",
        seatCapacity: 43,
      },
    },
    {
      id: "10",
      details: {
        airline: "WestJet",
        departingTime: "2023-11-28T13:00:00",
        arrivingTime: "2023-11-28T13:50:00",
        departureLocation: "Calgary",
        arrivalLocation: "Vancouver",
        leavingTime: "2023-12-02T14:00:00", // Added fictional time
        arriveBackTime: "2023-12-02T14:50:00", // Added fictional time
        leavingLocation: "Vancouver", // Added return location
        arriveBackLocation: "Calgary", // Added return location
        price: "110$",
        seatCapacity: 12,
      },
    },
    {
      id: "11",
      details: {
        airline: "Air Canada",
        departingTime: "2023-11-29T18:30:00",
        arrivingTime: "2023-11-29T19:20:00",
        departureLocation: "Calgary",
        arrivalLocation: "Vancouver",
        leavingTime: "2023-11-30T19:00:00", // Added fictional time
        arriveBackTime: "2023-11-30T19:50:00", // Added fictional time
        leavingLocation: "Vancouver", // Added return location
        arriveBackLocation: "Calgary", // Added return location
        price: "115$",
        seatCapacity: 15,
      },
    },
    // Add more flight objects with their respective details and unique IDs
  ];
  const [dataFromURL, setDataFromURL] = useState();
  const convertToLocalDateISOString = (dateString) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset)
      .toISOString()
      .split("T")[0];
  };
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("SEARCH", searchParams);
  // useEffect(() => {
  //   const params = Object.fromEntries(searchParams.entries());
  //   console.log("URL Params on Load:", params);

  //   if (
  //     Object.keys(params).length > 0 &&
  //     userFlightData &&
  //     !userFlightData.depart
  //   ) {
  //     const restoredData = {
  //       leaving: {
  //         name: params["leaving.name"] || "",
  //         iata: params["leaving.iataCode"] || "",
  //       },
  //       going: {
  //         name: params["going.name"] || "",
  //         iata: params["going.iataCode"] || "",
  //       },
  //       travellers: params["travellers"] || 0,
  //       depart: params["depart"]
  //         ? new Date(params["depart"] + "T00:00:00")
  //         : "", // Adjusted for timezone
  //       return: params["return"]
  //         ? new Date(params["return"] + "T00:00:00")
  //         : "", // Adjusted for timezone
  //     };
  //     setDataFromURL(restoredData);
  //     console.log("Restored Data:", restoredData);
  //   }
  // }, []);
  const handleViewDetailsClick = (id) => {
    const params = new URLSearchParams();

    // Convert userFlightData to URLSearchParams
    Object.keys(userFlightData).forEach((key) => {
      if (
        typeof userFlightData[key] === "object" &&
        userFlightData[key] !== null
      ) {
        if (key === "depart" || key === "return") {
          const date = new Date(userFlightData[key]);
          const formattedDate = convertToLocalDateISOString(
            userFlightData[key]
          );
          params.set(key, formattedDate);
        } else {
          Object.keys(userFlightData[key]).forEach((subKey) => {
            params.set(`${key}.${subKey}`, userFlightData[key][subKey]);
          });
        }
      } else {
        params.set(key, userFlightData[key]);
      }
    });
    params.set("flight_id", id);

    navigate(`/tickets?${params.toString()}`);
  };
  const formatDateOnly = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to format only the time to "Hour:Minute AM/PM"
  const formatTimeOnly = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const searchParamsObject = {
    leavingName: searchParams.get("leaving.city") || "",
    goingName: searchParams.get("going.city") || "",
    travellers: parseInt(searchParams.get("travellers") || "0", 10),
    departDate: searchParams.get("depart") || "",
    returnDate: searchParams.get("return") || "",
  };
  console.log("SE", searchParamsObject);

  // to search for flights

  const filterFlights = () => {
    return flightsData.filter((flight) => {
      const departureDate = flight.details.departingTime.split("T")[0];
      const returnDate = flight.details.arriveBackTime.split("T")[0];

      console.log(2, departureDate);
      return (
        flight.details.departureLocation === searchParamsObject.leavingName &&
        flight.details.arrivalLocation === searchParamsObject.goingName &&
        flight.details.seatCapacity >= searchParamsObject.travellers &&
        departureDate === searchParamsObject.departDate &&
        returnDate === searchParamsObject.returnDate
      );
    });
  };
  const filteredFlights = filterFlights();
  console.log(filterFlights);
  return (
    <>
      {filteredFlights.length > 0 ? (
        filteredFlights.map((flight) => {
          const { id, details } = flight;
          return (
            <div key={id} className="flight-details-container">
              <div className="flight-details__times">
                <div className="flight-details__time-info">
                  <div className="flights-info-left">
                    <div className="plane-company">{details.airline}</div>
                    <span>Departing</span>
                  </div>
                  <div className="flights-info-right">
                    <div className="flight-time-window">
                      <span>
                        {formatTimeOnly(details.departingTime)} -{" "}
                        {formatTimeOnly(details.arrivingTime)}
                        {formatDateOnly(details.departingTime)} -{" "}
                        {formatDateOnly(details.arrivingTime)}
                      </span>
                    </div>
                    <div className="flight-depart-return">
                      {details.departureLocation} - {details.arrivalLocation}
                    </div>
                  </div>
                </div>
                <div className="flight-details__time-info">
                  <div className="flights-info-left">
                    <div className="plane-company">{details.airline}</div>
                    <span>Returning</span>
                  </div>
                  <div className="flights-info-right">
                    <div className="flight-time-window">
                      <span>
                        {formatTimeOnly(details.leavingTime)} -{" "}
                        {formatTimeOnly(details.arriveBackTime)}
                        {formatDateOnly(details.leavingTime)} -{" "}
                        {formatDateOnly(details.arriveBackTime)}
                      </span>
                    </div>
                    <div className="flight-depart-return">
                      {details.leavingLocation} - {details.arriveBackLocation}
                    </div>
                  </div>
                </div>
                {/* Include Returning section if needed */}
              </div>
              <div className="flight-details__price">
                <div className="flight-price">{details.price}</div>
                <span>Round Trip</span>
                <button
                  onClick={() => {
                    handleViewDetailsClick(id);
                  }}
                  className="view-details-button"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No flights found for the selected criteria.</div>
      )}
    </>
  );
};

export default FlightsList;
