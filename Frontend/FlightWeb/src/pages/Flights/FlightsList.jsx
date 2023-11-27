import React from "react";
import "./flights.scss";
const flightsData = [
  {
    "Air Canada": {
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
    "United Airlines": {
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
    "British Airways": {
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
  // Add more airline objects here with their respective details
];
const FlightsList = () => {
  return (
    <>
      {flightsData.map((flight, index) => {
        const airline = Object.keys(flight)[0]; // Get the airline name
        const details = flight[airline]; // Get the details for this airline

        return (
          <div key={index} className="flight-details-container">
            <div className="flight-details__times">
              <div className="flight-details__time-info">
                <div className="flights-info-left">
                  <div className="plane-company">{airline}</div>
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
                  <div className="plane-company">{airline}</div>
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
              <button className="view-details-button">View Details</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FlightsList;
