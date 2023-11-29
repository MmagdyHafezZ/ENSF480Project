import React from "react";
import "./flights.scss";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import { useState, useEffect } from "react";
import flightsData from "../../data/flightsData.json";
import { useSearchParams } from "react-router-dom";
const FlightsList = () => {
  const navigate = useNavigate();
  const { userFlightData, searchState } = useUserDataContext();

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
    const flightDetails = flightsData.find((flight) => flight.id === id);
    navigate("/tickets", { state: { flightDetails } });
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
                  <div className="plane-company">{details.aircraft}</div>
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
                  <div className="plane-company">{details.aircraft}</div>
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
