import React from "react";
import "./flights.scss";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const FlightsList = () => {
  const navigate = useNavigate();
  const { userFlightData, searchState } = useUserDataContext();

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
        departingTime: "2023-12-04T00:00:00",
        arrivingTime: "2023-12-04T00:00:00",
        departureLocation: "Calgary",
        arrivalLocation: "Vancouver",
        leavingTime: "2023-12-08T00:00:00", // Added fictional time
        arriveBackTime: "2023-12-08T00:00:00", // Added fictional time
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

  const handleViewDetailsClick = (id) => {
    navigate(`/tickets`);
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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState([]);
  useEffect(() => {
    const originalDepartDate = new Date(userFlightData.depart);
    const formattedOriginalDate = originalDepartDate.toISOString().slice(0, 19);
    const originalReturnDate = new Date(userFlightData.return);
    const formattedReturnDate = originalReturnDate.toISOString().slice(0, 19);

    const newFilteredFlights = flightsData.filter((flight) => {
      return (
        flight.details.departureLocation === userFlightData.leaving.city &&
        flight.details.arrivalLocation === userFlightData.going.city &&
        flight.details.departingTime.split("T")[0] ===
          formattedOriginalDate.split("T")[0] &&
        flight.details.leavingTime.split("T")[0] ===
          formattedReturnDate.split("T")[0] &&
        userFlightData.travellers < flight.details.seatCapacity
      );
    });

    // Update filteredFlights when searchState changes
    if (searchState !== isSearchActive) {
      setFilteredFlights(newFilteredFlights);
      setIsSearchActive(searchState);
    }
  }, [searchState, userFlightData]);
  return (
    <div className="flights-list">
      {filteredFlights.map((flight) => {
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
                      {/* {formatDateOnly(details.departingTime)} -{" "}
                      {formatDateOnly(details.arrivingTime)} */}
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
                      {/* {formatDateOnly(details.leavingTime)} -{" "}
                      {formatDateOnly(details.arriveBackTime)} */}
                    </span>
                  </div>
                  <div className="flight-depart-return">
                    {details.leavingLocation} - {details.arriveBackLocation}
                  </div>
                </div>
              </div>
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
      })}
    </div>
  );
};

export default FlightsList;
