import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./TicketDetails.scss";
import { useSearchParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserDataContext } from "../../context/UserDataContext";
import SeatContainer from "../../Components/SeatMaps/SeatsContainer";
import SmallPlane from "../../Components/SeatMapSelect/SmallPlane";
import MediumPlane from "../../Components/SeatMapSelect/MediumPlane";
import ErrorComponent from "../../Components/ErrorPage/ErrorComponent";
const TicketDetails = () => {
  // const [flightId, setFlightId] = useState();
  const { userFlightData, setUserFlightData, selectedSeats, price, setPrice } =
    useUserDataContext();
  const location = useLocation();
  const flightDetails = location.state?.flightDetails;
  const seats = Object.keys(selectedSeats).filter(
    (seat) => selectedSeats[seat]
  );
  const navigate = useNavigate();

  const formatDate = (dateInput) => {
    // Check if the input is not a Date object and try to convert it
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date"; // or handle the error as you see fit
    }

    let month = date.getMonth() + 1; // getMonth() returns month from 0-11
    let day = date.getDate();

    // Add leading zero to single-digit months and days
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${month}/${day}`;
  };

  const calculateTotalPrice = () => {
    const total = Object.values(selectedSeats)
      .filter((seat) => seat.isSelected)
      .reduce((total, seat) => total + seat.price, 0);

    setPrice(total); // Update the price state with the calculated total
  };
  const isSeatSelectionComplete =
    Object.keys(selectedSeats).length === userFlightData.travellers;
  // console.log(Object.keys(selectedSeats).length);
  console.log(selectedSeats);
  const SeatMapComponent =
    flightDetails?.details?.aircraft === "Embraer E175-E2"
      ? SmallPlane
      : MediumPlane;
  if (!flightDetails) {
    return (
      <>
        <ErrorComponent />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="ticket-details-wrapper">
        {/* <div className="">gello {selectedSeats[0]}</div> */}
        <div className="ticket-details-container">
          <h1>Flight Details</h1>
          <div className="ticket-details-top">
            <span>Round-Trip</span>
            <span>-</span>
            <span>{userFlightData.travellers} traveller(s)</span>
            <span>-</span>
            <span>{formatDate(userFlightData.depart)}</span>
            <span>-</span>
            <span>{formatDate(userFlightData.return)}</span>
          </div>
          <div className="ticket-details-bottom">
            <span>
              {flightDetails && flightDetails.details.departureLocation}
            </span>{" "}
            -{" "}
            <span>
              {flightDetails && flightDetails.details.arrivalLocation}
            </span>
          </div>
        </div>

        <div className="seat-select-container">
          <h2>Select Your Seats</h2>
          <div className="seat-select-container-body">
            <div className="seat-map-card-container">
              <SeatContainer
                SeatMapComponent={SeatMapComponent}
                isBooking={true}
                flightDetails={flightDetails}
                // size={size}
              />
            </div>

            <div className="final-details-container">
              <div className="selected-seats-container">
                <h3>Your Selected Seats:</h3>
                {seats.length > 0 ? (
                  <ul>
                    {seats.map((seat) => (
                      <li key={seat}>{seat}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No seats selected</p>
                )}
              </div>
              <div className="selected-seats-container price">
                <div className="total-price">
                  <h3>Total</h3>
                  <span className="price">${price} CAD</span>
                </div>
              </div>
              <button
                disabled={!isSeatSelectionComplete}
                onClick={() => {
                  navigate("/payment", {
                    state: { price, flightDetails, selectedSeats },
                  });
                }}
                className="ticket-next-button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
