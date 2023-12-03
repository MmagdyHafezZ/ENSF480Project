import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./TicketDetails.scss";
import { useSearchParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import SeatContainer from "../../Components/SeatMaps/SeatsContainer";
import SmallPlane from "../../Components/SeatMapSelect/SmallPlane";
import MediumPlane from "../../Components/SeatMapSelect/MediumPlane";
import ErrorComponent from "../../Components/ErrorPage/ErrorComponent";
import AirplaneRedirectLoading from "../../Components/LoadingScreens/AirplaneRedirectLogin";
import AirplaneLoading from "../../Components/LoadingScreens/AirplaneLoading";
import { useUserDataContext } from "../../context/UserDataContext";
import updateSeatMapData from "../../utils/updateSeatMapData";
const TicketDetails = () => {
  // const [flightId, setFlightId] = useState();
  const {
    userFlightData,
    setUserFlightData,
    selectedSeats,
    price,
    setPrice,
    isLoggedInContext,
  } = useUserDataContext();
  useEffect(() => {
    const fetchAndUpdateSeatData = async () => {
      console.log("Flight Details", userFlightData);
      const updatedSeatData = await updateSeatMapData(
        {},
        userFlightData.flightId
      );
      setAllSeatData(updatedSeatData);
    };
    if (userFlightData && userFlightData.flightId) {
      fetchAndUpdateSeatData();
    }
  }, []);
  const [mealPreference, setMealPreference] = useState(
    localStorage.getItem("mealPreference") || ""
  );

  console.log(
    isLoggedInContext
      ? "Ticket Details Logged In"
      : "Ticket Details not Logged In"
  );
  // useEffect(() => {
  //   // Check the login status when the component mounts
  //   const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
  //   setIsLoggedIn(loggedInStatus);
  // }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true); // Show loading screen
    document.body.classList.add("no-scroll");
    setTimeout(() => {
      if (isLoggedInContext) {
        // User is logged in, navigate to payment
        navigate("/payment", {
          state: { price, flightDetails, selectedSeats },
        });
      } else {
        // User is not logged in, navigate to login and pass current state
        document.body.classList.remove("no-scroll");
        navigate("/signin", {
          state: {
            from: "ticketDetails",
            ticketDetailsState: { price, flightDetails, selectedSeats },
          },
        });
      }
    }, 3000); // Replace 3000 with the number of milliseconds you want the loading screen to appear
  };

  const location = useLocation();
  const flightDetails = location.state?.flightDetails || null;
  const [showCheckmark, setShowCheckmark] = useState(
    location.state?.showCheckmark || false
  );
  console.log("CHECL", userFlightData);
  useEffect(() => {
    document.body.classList.add("no-scroll");
    if (showCheckmark) {
      // Show checkmark animation

      setTimeout(() => {
        // After animation, redirect to payment
        document.body.classList.remove("no-scroll");
        navigate("/payment", {
          state: { price, flightDetails, selectedSeats },
        });
      }, 2000); // Replace with actual animation duration
    }
  }, [showCheckmark]);
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
  const SeatMapComponent =
    flightDetails?.planeType === "A" ? SmallPlane : MediumPlane;
  console.log(!flightDetails);

  if (isLoading) {
    if (isLoggedInContext) {
      return (
        <>
          <AirplaneLoading />
        </>
      );
    } else {
      return (
        <>
          <AirplaneRedirectLoading />
        </>
      ); // Your loading screen here
    }
  }
  if (!flightDetails) {
    return (
      <>
        <ErrorComponent />
      </>
    );
  }

  return (
    <>
      {showCheckmark && (
        <div className="ticket-details-popup">
          <div className="checkmark-container">
            <div class="wrapper">
              {" "}
              <svg
                class="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                {" "}
                <circle
                  class="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />{" "}
                <path
                  class="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
            <span>Your are now Logged In</span>
          </div>
        </div>
      )}
      <Navbar />
      <div className="ticket-details-wrapper">
        {/* <div className="">gello {selectedSeats[0]}</div> */}
        <div className="ticket-details-container">
          <h1>Flight Details</h1>
          <div className="ticket-details-top">
            <span>Round-Trip</span>
            <span>-</span>
            <span>{userFlightData.travellers} Travellers</span>
            <span>-</span>
            <span>
              Departure Day: {formatDate(flightDetails.departure_day)}
            </span>
            <span>-</span>
            <span>Departure Time: {flightDetails.departure_time}</span>
            <span>-</span>
            <span>Arrival Day: {formatDate(flightDetails.arrival_day)}</span>
            <span>-</span>
            <span>Arrival Time: {flightDetails.arrival_time}</span>
          </div>
          <div className="ticket-details-bottom">
            <span>{flightDetails && flightDetails.iata2}</span> -{" "}
            <span>{flightDetails && flightDetails.iata1}</span> - {""}
            <span>{flightDetails && flightDetails.id}</span>
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
              <div className="meal-preference-container">
                <h3>Meal Preference:</h3>
                <select
                  value={mealPreference}
                  onChange={(e) =>
                    setMealPreference(e.target.value) &&
                    localStorage.setItem("mealPreference", e.target.value)
                  }
                  className="meal-preference-select"
                >
                  <option value="">Select a meal</option>
                  <option value="Standard Meal">Standard Meal</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Kosher">Kosher</option>
                </select>
              </div>
              <div className="selected-seats-container price">
                <div className="total-price">
                  <h3>Total</h3>
                  <span className="price">${price} CAD</span>
                </div>
              </div>
              <button
                disabled={!isSeatSelectionComplete}
                onClick={handleNavigation}
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
