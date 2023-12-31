import React, { useState, useEffect } from "react";
// import "./planes.css";
import "./planes.scss";
import { BsXLg } from "react-icons/bs";
import seatData from "./sm_seatAvailability.json";
const SmallPlane = ({ isBooking }) => {
  const [allSeatData, setAllSeatData] = useState(seatData);
  // Function to handle the click event on seats

  // Function to generate seat divs
  const generateSeats = (numRows, numColumns) => {
    let rows = [];

    // Header for business class
    const headerBusinessRow = (
      <div className="row header-row">
        <div className="left-column">
          {["A"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
        <div className="aisle"></div>
        <div className="right-column">
          {["C", "D"].map((letter) => (
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
          {["A", "B"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
        <div className="aisle"></div>
        <div className="right-column">
          {["C", "D"].map((letter) => (
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

      for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
        // Skip B for business class
        if (columnIndex === 4) continue;
        const seatId = `${String.fromCharCode(65 + columnIndex)}${
          rowIndex + 1
        }`;
        const seatInfo = seatData[seatId];
        const isAvailable = seatInfo?.available;
        const isB =
          seatId === "B1" ||
          seatId === "B2" ||
          seatId === "B3" ||
          seatId === "B4";
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
            className={`seat ${
              isAvailable === false ? "unavailable" : ""
            } business ${isB ? "remove-seat" : ""}`}
            onClick={() => isAvailable && handleSeatClick(seatId)}
          >
            {seatContent}
          </span>
        );

        columnIndex < 2
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
        // console.log(seatData);
        // console.log(seatInfo);
        const isAvailable = seatInfo?.available;
        // const isSelected = selectedSeats[seatId];
        const rowNumber = parseInt(seatId.slice(1));
        const isWingSeat = rowNumber >= 9 && rowNumber <= 12 ? "wing-row" : "";
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
            className={`seat  ${isAvailable === false ? "unavailable" : ""} ${
              seatInfo?.type || "ordinary"
            } ${isWingSeat}`}
            onClick={() => isAvailable && handleSeatClick(seatId)}
          >
            {seatContent}
          </span>
        );

        seats.push(seat);
      }

      rows.push(
        <div key={rowIndex} className="row">
          <div className="left-column">{seats.slice(0, 2)}</div>
          <div className="aisle"></div>
          <div className="right-column">{seats.slice(2, 4)}</div>
        </div>
      );
    }

    return rows;
  };

  // Function to update seat availability

  // useEffect to call updateSeatAvailability when flightDetails changes

  return (
    <>
      <div className="seatMap">{generateSeats(19, 4)}</div>
      {/* <button onClick={updateSeatAvailability}>Test</button> */}
    </>
  );
};

export default SmallPlane;
