import React, { useState } from "react";
// import "./planes.css";
import "../SeatMaps/planes.scss";
import { BsXLg } from "react-icons/bs";
import seatData from "../../data/mp_seatAvailability.json";
import { useUserDataContext } from "../../context/UserDataContext";
const MediumPlane = ({ isBooking }) => {
  const [allSeatData, setAllSeatData] = useState(seatData); // <----- This is the seat data of the chosen flight
  const { userFlightData, selectedSeats, setSelectedSeats, price, setPrice } =
    useUserDataContext();

  // Function to handle the click event on seats
  const handleSeatClick = (seatId, seatContent) => {
    if (isBooking) {
      setSelectedSeats((prevSelectedSeats) => {
        const currentlySelected = Object.keys(prevSelectedSeats).filter(
          (key) => prevSelectedSeats[key]
        ).length;

        // Toggle the selected state for the seat
        let updatedSelectedSeats;
        if (prevSelectedSeats[seatId]) {
          // Seat is currently selected, so remove it
          updatedSelectedSeats = { ...prevSelectedSeats };
          delete updatedSelectedSeats[seatId];
        } else {
          // Seat is not selected and we have room for more, so add it
          if (currentlySelected < userFlightData.travellers) {
            updatedSelectedSeats = {
              ...prevSelectedSeats,
              [seatId]: true,
            };
          } else {
            // No room for more selections, return previous state
            return prevSelectedSeats;
          }
        }

        // Calculate the total price based on the selected seats
        const totalPrice = Object.keys(updatedSelectedSeats).reduce(
          (total, seatId) => {
            if (updatedSelectedSeats[seatId]) {
              const seatInfo = seatData[seatId];
              if (seatInfo && seatInfo.available) {
                total += seatInfo.price;
              }
            }
            return total;
          },
          0
        );

        // Update the price state
        setPrice(totalPrice);

        return updatedSelectedSeats;
      });
    }
  };

  const displaySelectedSeats = () => {
    const selectedSeatIds = Object.keys(selectedSeats).filter(
      (seatId) => selectedSeats[seatId]
    );
    return selectedSeatIds.length > 0 ? selectedSeatIds.join(", ") : "None";
  };

  // Function to generate seat divs
  const generateSeats = (numRows, numColumns) => {
    let rows = [];

    // Header for business class
    const headerBusinessRow = (
      <div className="row header-row">
        <div className="left-column">
          {["A", "C"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
        <div className="aisle"></div>
        <div className="right-column">
          {["D", "F"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
      </div>
    );

    // Header for the rest of the plane
    const headerRow = (
      <div className="row header-row">
        <div className="left-column">
          {["A", "B", "C"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
        <div className="aisle"></div>
        <div className="right-column">
          {["D", "E", "F"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
      </div>
    );

    // Generate business class rows
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      if (rowIndex === 0)
        rows.push(
          <div key="business-header" className="row header-row">
            {headerBusinessRow}
          </div>
        );

      let leftColumnSeats = [];
      let rightColumnSeats = [];

      for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
        // Skip B and E seats for business class
        if (columnIndex === 1 || columnIndex === 4) continue;
        const seatId = `${String.fromCharCode(65 + columnIndex)}${
          rowIndex + 1
        }`;
        const seatInfo = seatData[seatId];
        const isAvailable = seatInfo?.available;
        const isSelected = selectedSeats[seatId];
        const isWingSeat = 16 <= seatData[seatId] <= 23 ? "wing-row" : "";
        let seatContent = isBooking ? (
          isAvailable ? (
            `$${seatInfo?.price}`
          ) : (
            <BsXLg />
          )
        ) : (
          seatId
        );

        const seat = (
          <span
            key={seatId}
            className={`seat ${isSelected ? "selected" : ""} ${
              isAvailable === false ? "unavailable" : ""
            } business `}
            onClick={() => isAvailable && handleSeatClick(seatId)}
          >
            {seatContent}
          </span>
        );

        columnIndex < 3
          ? leftColumnSeats.push(seat)
          : rightColumnSeats.push(seat);
      }

      rows.push(
        <div key={rowIndex} className="row">
          <div className="left-column">{leftColumnSeats}</div>
          <div className="aisle"></div>
          <div className="right-column">{rightColumnSeats}</div>
        </div>
      );
    }

    // Generate the rest of the rows
    for (let rowIndex = 4; rowIndex < numRows; rowIndex++) {
      if (rowIndex === 4)
        rows.push(
          <div key="economy-header" className="row header-row">
            {headerRow}
          </div>
        );

      let seats = [];

      for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
        const seatId = `${String.fromCharCode(65 + columnIndex)}${
          rowIndex + 1
        }`;
        const seatInfo = seatData[seatId];
        const isAvailable = seatInfo?.available;
        const isSelected = selectedSeats[seatId];
        const rowNumber = parseInt(seatId.slice(1));
        const isWingSeat = rowNumber >= 16 && rowNumber <= 23 ? "wing-row" : "";
        let seatContent = isBooking ? (
          isAvailable ? (
            `$${seatInfo?.price}`
          ) : (
            <BsXLg />
          )
        ) : (
          seatId
        );

        const seat = (
          <span
            key={seatId}
            className={`seat ${isSelected ? "selected" : ""} ${
              isAvailable === false ? "unavailable" : ""
            } ${isWingSeat} ${seatInfo?.type || "ordinary"} ${rowNumber}`}
            onClick={() => isAvailable && handleSeatClick(seatId)}
          >
            {seatContent}
          </span>
        );

        seats.push(seat);
      }

      rows.push(
        <div key={rowIndex} className="row">
          <div className="left-column">{seats.slice(0, 3)}</div>
          <div className="aisle"></div>
          <div className="right-column">{seats.slice(3)}</div>
        </div>
      );
    }

    return rows;
  };

  return (
    <>
      <div className="seatMap">{generateSeats(28, 6)}</div>
    </>
  );
};

export default MediumPlane;
