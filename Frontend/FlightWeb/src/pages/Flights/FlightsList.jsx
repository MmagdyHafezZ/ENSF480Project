import React from "react";
import "./flights.scss";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
const FlightsList = () => {
  const navigate = useNavigate();
  const { userFlightData } = useUserDataContext();
  const flightsData = [
    {
      id: "1", // Unique identifier
      details: {
        airline: "Air Canada",
        departingTime: "4:30pm",
        arrivingTime: "7:30pm",
        departureLocation: "Calgary, AB",
        arrivalLocation: "Vancouver, BC",
        leavingTime: "2:30pm",
        arriveBackTime: "5:30pm",
        leavingLocation: "Vancouver, BC",
        arriveBackLocation: "Calgary, AB",
        price: "89$",
      },
    },
    {
      id: "2", // Unique identifier
      details: {
        airline: "United Airlines",
        departingTime: "6:00pm",
        arrivingTime: "9:00pm",
        departureLocation: "Los Angeles, CA",
        arrivalLocation: "New York, NY",
        leavingTime: "2:30pm",
        arriveBackTime: "5:30pm",
        leavingLocation: "Vancouver, BC",
        arriveBackLocation: "Calgary, AB",
        price: "120$",
      },
    },
    {
      id: "3", // Unique identifier
      details: {
        airline: "British Airways",
        departingTime: "10:00am",
        arrivingTime: "2:00pm",
        departureLocation: "London, UK",
        arrivalLocation: "Paris, FR",
        leavingTime: "2:30pm",
        arriveBackTime: "5:30pm",
        leavingLocation: "Vancouver, BC",
        arriveBackLocation: "Calgary, AB",
        price: "75£",
      },
    },
    // Add more flight objects with their respective details and unique IDs
  ];

  const handleViewDetailsClick = () => {
    const params = new URLSearchParams();

    // Convert userFlightData to URLSearchParams
    Object.keys(userFlightData).forEach((key) => {
      if (
        typeof userFlightData[key] === "object" &&
        userFlightData[key] !== null
      ) {
        Object.keys(userFlightData[key]).forEach((subKey) => {
          params.set(`${key}.${subKey}`, userFlightData[key][subKey]);
        });
      } else {
        params.set(key, userFlightData[key]);
      }
    });

    navigate(`/tickets?${params.toString()}`);
  };
  return (
    <>
      {flightsData.map((flight) => {
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
                      {details.departingTime} - {details.arrivingTime}
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
                      {details.leavingTime} - {details.arriveBackTime}
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
                onClick={handleViewDetailsClick}
                className="view-details-button"
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FlightsList;
