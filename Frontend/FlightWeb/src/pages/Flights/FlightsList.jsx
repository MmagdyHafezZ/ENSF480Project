import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import "./flights.scss";

const FlightsList = ({ userFlightData }) => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useUserDataContext();
  const [filteredFlights, setFilteredFlights] = useState([]);

  const formatDateOnly = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTimeOnly = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/getFilteredFlightList`, {
        params: {
          iata1: userFlightData.leaving.iata,
          iata2: userFlightData.going.iata,
          DepartureDay: userFlightData.depart.toISOString().split("T")[0],
        },
      })
      .then((response) => {
        setFilteredFlights(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flights data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userFlightData, setIsLoading]);

  const handleViewDetailsClick = (id) => {
    const flightDetails = filteredFlights.find((flight) => flight.id === id);
    navigate("/tickets", { state: { flightDetails } });
  };

  return (
    <div className="flights-list">
      {isLoading ? (
        <>
          <div className="loading-flight-list">
            <div className="loading-flights-list-container">
              <span className="loadingSpan"></span>
            </div>
          </div>
        </> // Loading indicator
      ) : filteredFlights.length > 0 ? (
        filteredFlights.map((flight) => {
          const {
            id,
            iata1,
            iata2,
            arrival_day,
            departure_day,
            arrival_time,
            departure_time,
            ordinaryPrice,
            businessPrice,
            comfortPrice,
          } = flight;

          return (
            <div key={id} className="flight-details-container">
              <div className="flight-details__times">
                <div className="flight-details__time-info">
                  <div className="flights-info-left">
                    <div className="plane-company">
                      Flight {iata1} to {iata2}
                    </div>
                    <span>Departing: {formatDateOnly(departure_day)}</span>
                  </div>
                  <div className="flights-info-right">
                    <div className="flight-time-window">
                      <span>
                        Departure Time: {formatTimeOnly(departure_time)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flight-details__time-info">
                  <div className="flights-info-left">
                    <span>Arriving: {formatDateOnly(arrival_day)}</span>
                  </div>
                  <div className="flights-info-right">
                    <div className="flight-time-window">
                      <span>Arrival Time: {formatTimeOnly(arrival_time)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flight-details__price">
                <div className="flight-price">
                  Ordinary: ${ordinaryPrice.toFixed(2)}
                </div>
                <div className="flight-price">
                  Comfort: ${comfortPrice.toFixed(2)}
                </div>
                <div className="flight-price">
                  Business: ${businessPrice.toFixed(2)}
                </div>
                <button
                  onClick={() => handleViewDetailsClick(id)}
                  className="view-details-button"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>Sorry, no flights available.</p>
      )}
    </div>
  );
};

export default FlightsList;
