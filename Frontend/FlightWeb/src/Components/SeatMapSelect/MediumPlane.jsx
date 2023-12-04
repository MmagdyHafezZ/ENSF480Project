import React, { useState, useEffect } from "react";
import "../SeatMaps/planes.scss";
import { BsXLg } from "react-icons/bs";
import axios from "axios";
import { useUserDataContext } from "../../context/UserDataContext";

const MediumPlane = ({ isBooking, flightDetails }) => {
  const { userFlightData, selectedSeats, setSelectedSeats, setPrice } =
    useUserDataContext();
  const [allSeatData, setAllSeatData] = useState({});

  useEffect(() => {
    const fetchSeatData = async () => {
      if (flightDetails && flightDetails.id) {
        try {
          const response = await axios.get(
            `http://localhost:8080/getSeatsByFlightId/flightId=${flightDetails.id}`
          );
          const seatData = response.data.reduce((acc, seat) => {
            acc[seat.seatID] = {
              available: seat.isAvailable,
              type: seat.seatType,
              price: seat.flight[`${seat.seatType}Price`],
            };
            return acc;
          }, {});
          setAllSeatData(seatData);
          console.log("allSeatData", allSeatData);
        } catch (error) {
          console.error("Error fetching seat data:", error);
        }
      }
    };

    fetchSeatData();
  }, [flightDetails]);

  const handleSeatClick = (seatId) => {
    if (isBooking) {
      setSelectedSeats((prevSelectedSeats) => {
        const currentlySelected = Object.keys(prevSelectedSeats).filter(
          (key) => prevSelectedSeats[key]
        ).length;
        let updatedSelectedSeats = { ...prevSelectedSeats };

        if (prevSelectedSeats[seatId]) {
          delete updatedSelectedSeats[seatId];
        } else if (currentlySelected < userFlightData.travellers) {
          updatedSelectedSeats[seatId] = true;
        } else {
          return prevSelectedSeats;
        }

        // Corrected total price calculation
        const totalPrice = Object.keys(updatedSelectedSeats).reduce(
          (total, seatId) => {
            return updatedSelectedSeats[seatId] &&
              allSeatData[seatId]?.available
              ? total + allSeatData[seatId].price
              : total;
          },
          0
        );

        setPrice(totalPrice);
        toggleSeat(seatId);
        return updatedSelectedSeats;
      });
    }
  };
  const toggleSeat = async (seatId) => {
    const res = await axios.put(
      `http://localhost:8080/toggleSeat/${flightDetails.id}/${seatId}`
    );
    console.log("res", res);
  };

  const displaySelectedSeats = () => {
    const selectedSeatIds = Object.keys(selectedSeats).filter(
      (seatId) => selectedSeats[seatId]
    );
    return selectedSeatIds.length > 0 ? selectedSeatIds.join(", ") : "None";
  };

  // Function to generate seat divs
  const generateSeats = (numRows, numColumns) => {
    const rows = [];

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
      // Add business class header
      if (rowIndex === 0) {
        rows.push(
          <div key="business-header" className="row header-row">
            {headerBusinessRow}
          </div>
        );
      }

      let leftColumnSeats = [];
      let rightColumnSeats = [];

      for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
        // Skip B and E seats for business class
        if (columnIndex === 1 || columnIndex === 4) continue;

        const seatId = `${String.fromCharCode(65 + columnIndex)}${
          rowIndex + 1
        }`;
        const seatData = allSeatData[seatId];
        const isAvailable = seatData?.available;
        const isSelected = selectedSeats[seatId];
        const isWingSeat = rowIndex >= 4 && rowIndex <= 11 ? "wing-row" : "";
        let seatContent = isBooking ? (
          isAvailable ? (
            `$${seatData?.price} (${seatId})`
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
            } ${isWingSeat} ${seatData?.type || "ordinary"} business`}
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
        <div key={`business-row-${rowIndex}`} className="row">
          <div className="left-column">{leftColumnSeats}</div>
          <div className="aisle"></div>
          <div className="right-column">{rightColumnSeats}</div>
        </div>
      );
    }

    // Generate the rest of the rows
    for (let rowIndex = 4; rowIndex < numRows; rowIndex++) {
      // Add economy class header
      if (rowIndex === 4) {
        rows.push(
          <div key="economy-header" className="row header-row">
            {headerRow}
          </div>
        );
      }

      let seats = [];

      for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
        const seatId = `${String.fromCharCode(65 + columnIndex)}${
          rowIndex + 1
        }`;
        const seatData = allSeatData[seatId];
        const isAvailable = seatData?.available;
        const isSelected = selectedSeats[seatId];
        const isWingSeat = rowIndex >= 16 && rowIndex <= 23 ? "wing-row" : "";
        let seatContent = isBooking ? (
          isAvailable ? (
            `$${seatData?.price} (${seatId})`
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
            } ${isWingSeat} ${seatData?.type || "ordinary"}`}
            onClick={() => isAvailable && handleSeatClick(seatId)}
          >
            {seatContent}
          </span>
        );

        seats.push(seat);
      }

      rows.push(
        <div key={`economy-row-${rowIndex}`} className="row">
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
