import React, { useState } from "react";
// import "./planes.css";
import "./planes.scss";
import { BsXLg } from "react-icons/bs";
import seatData from "../../data/lg_seatAvailability.json";
const LargePlane = ({ isBooking }) => {
  const [selectedSeats, setSelectedSeats] = useState({});

  // Function to handle the click event on seats
  const handleSeatClick = (seatId) => {
    if (isBooking) {
      console.log("1");
      setSelectedSeats((prevSelectedSeats) => ({
        ...prevSelectedSeats,
        [seatId]: !prevSelectedSeats[seatId], // Toggle the selected state
      }));
    }
  };

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
        <div className="middle-column">
          {["B", "C"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
        <div className="aisle"></div>
        <div className="right-column">
          {["D"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
      </div>
    );

    // Header for the rest of the plane
    const headerComfortRow = (
      <div className="row header-row">
        <div className="left-column">
          {["A", "B"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
        <div className="aisle"></div>
        <div className="middle-column">
          {["C", "D", "E"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
        <div className="aisle"></div>
        <div className="right-column">
          {["F", "G"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
      </div>
    );
    const headerOrdinaryRow = (
      <div className="row header-row">
        <div className="left-column">
          {["A", "B", "C"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
        <div className="middle-column">
          {["D", "E", "F"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
        <div className="aisle"></div>
        <div className="right-column">
          {["G", "H", "I"].map((letter) => (
            <span key={letter} className="seat seat-map-header">
              {letter}
            </span>
          ))}
        </div>
      </div>
    );

    // Generate business class rows
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      if (rowIndex === 0)
        rows.push(
          <div key="business-header" className="row header-row">
            {headerBusinessRow}
          </div>
        );

      let leftColumnSeatsBusiness = [];
      let rightColumnSeatsBusiness = [];
      let middleColumnSeatsBusiness = [];

      for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
        if (columnIndex > 3) continue;
        const seatId = `${String.fromCharCode(65 + columnIndex)}${
          rowIndex + 1
        }`;
        const seatInfo = seatData[seatId];
        const isAvailable = seatInfo?.available;
        const isSelected = selectedSeats[seatId];
        const isSideSeat = columnIndex === 0;
        const isSideSeatRight = columnIndex === 3;
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
          <>
            {isSideSeatRight ? (
              <span
                className={`seat ${isSelected ? "selected" : ""} remove-seat`}
                onClick={() => isAvailable && handleSeatClick(seatId)}
              ></span>
            ) : (
              <></>
            )}
            <span
              key={`${seatId}-business-${columnIndex}`}
              className={`seat ${isSelected ? "selected" : ""} ${
                isAvailable === false ? "unavailable" : ""
              } ${seatInfo?.type || "ordinary"} ${
                isSideSeat ? "side-seat" : ""
              }`}
              onClick={() => isAvailable && handleSeatClick(seatId)}
            >
              {seatContent}
            </span>
            {isSideSeat ? (
              <span
                className={`seat ${isSelected ? "selected" : ""} remove-seat`}
                onClick={() => isAvailable && handleSeatClick(seatId)}
              ></span>
            ) : (
              <></>
            )}
          </>
        );

        // columnIndex < 2
        //   ? leftColumnSeats.push(seat)
        //   : rightColumnSeats.push(seat);
        columnIndex === 0
          ? leftColumnSeatsBusiness.push(seat)
          : columnIndex > 2
          ? rightColumnSeatsBusiness.push(seat)
          : middleColumnSeatsBusiness.push(seat);
      }

      rows.push(
        <div key={`business-row-${rowIndex}`} className="row">
          <div className="left-column">{leftColumnSeatsBusiness}</div>
          <div className="aisle"></div>
          <div className="middle-column">{middleColumnSeatsBusiness}</div>
          <div className="aisle"></div>
          <div className="right-column">{rightColumnSeatsBusiness}</div>
        </div>
      );
    }

    // Generate the comfort rows
    for (let rowIndex = 9; rowIndex < 25; rowIndex++) {
      if (rowIndex === 9)
        rows.push(
          <div key="comfort-header" className="row header-row">
            {headerComfortRow}
          </div>
        );

      let leftColumnSeatsComfort = [];
      let rightColumnSeatsComfort = [];
      let middleColumnSeatsComfort = [];

      for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const seatId = `${String.fromCharCode(65 + columnIndex)}${
          rowIndex + 1
        }`;
        const seatInfo = seatData[seatId];
        const isAvailable = seatInfo?.available;
        const isSelected = selectedSeats[seatId];
        const rowNumber = parseInt(seatId.slice(1));
        const isWingSeat = rowNumber >= 10 && rowNumber <= 25 ? "wing-row" : "";
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
          <>
            <span
              key={`${seatId}-comfort-${columnIndex}`}
              className={`seat ${isSelected ? "selected" : ""} ${
                isAvailable === false ? "unavailable" : ""
              } ${isWingSeat} ${seatInfo?.type || "ordinary"}`}
              onClick={() => isAvailable && handleSeatClick(seatId)}
            >
              {seatContent}
            </span>
          </>
        );
        columnIndex < 2
          ? leftColumnSeatsComfort.push(seat)
          : columnIndex > 4
          ? rightColumnSeatsComfort.push(seat)
          : middleColumnSeatsComfort.push(seat);
      }

      rows.push(
        <div key={`comfort-row-${rowIndex}`} className="row">
          <div className="left-column">{leftColumnSeatsComfort}</div>
          <div className="aisle">123</div>
          <div className="middle-column">{middleColumnSeatsComfort}</div>
          <div className="aisle">123</div>
          <div className="right-column">{rightColumnSeatsComfort}</div>
        </div>
      );
    }

    // Generate Ordinary Rows:
    for (let rowIndex = 25; rowIndex < 40; rowIndex++) {
      if (rowIndex === 25) {
        rows.push(
          <div key="ordinary-header" className="row header-row">
            {headerOrdinaryRow}
          </div>
        );
      }

      let leftColumnSeatsOrdinary = [];
      let middleColumnSeatsOrdinary = [];
      let rightColumnSeatsOrdinary = [];

      for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
        const seatId = `${String.fromCharCode(65 + columnIndex)}${
          rowIndex + 1
        }`;
        const seatInfo = seatData[seatId];
        const isAvailable = seatInfo?.available;
        const isSelected = selectedSeats[seatId];
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
            key={`${seatId}-ordinary-${columnIndex}`}
            className={`seat ${isSelected ? "selected" : ""} ${
              isAvailable === false ? "unavailable" : ""
            } ${seatInfo?.type || "ordinary"}`}
            onClick={() => isAvailable && handleSeatClick(seatId)}
          >
            {seatContent}
          </span>
        );

        if (columnIndex < 3) {
          leftColumnSeatsOrdinary.push(seat);
        } else if (columnIndex > 5) {
          rightColumnSeatsOrdinary.push(seat);
        } else {
          middleColumnSeatsOrdinary.push(seat);
        }
      }

      rows.push(
        <div key={`ordinary-row-${rowIndex}`} className="row">
          <div className="left-column">{leftColumnSeatsOrdinary}</div>
          <div className="aisle"></div>
          <div className="middle-column">{middleColumnSeatsOrdinary}</div>
          <div className="aisle"></div>
          <div className="right-column">{rightColumnSeatsOrdinary}</div>
        </div>
      );
    }

    return rows;
  };

  return (
    <>
      <div className="seatMap">{generateSeats(30, 6)}</div>
    </>
  );
};

export default LargePlane;
