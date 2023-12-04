import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import "../SeatMaps/planes.scss";
import { BsXLg } from "react-icons/bs";
import { useUserDataContext } from "../../context/UserDataContext";

const SmallPlane = ({ isBooking, flightDetails }) => {
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
          const seats = response.data.reduce((acc, seat) => {
            acc[seat.seatID] = {
              ...seat,
              price: seat.flight[`${seat.seatType}Price`],
              available: seat.isAvailable,
            };
            return acc;
          }, {});
          setAllSeatData(seats);
        } catch (error) {
          console.error("Error fetching seat data:", error);
        }
      }
    };

    fetchSeatData();
  }, [flightDetails]);

  const handleSeatClick = (seatId) => {
    if (isBooking && allSeatData[seatId]?.available) {
      setSelectedSeats((prevSelectedSeats) => {
        const updatedSelectedSeats = {
          ...prevSelectedSeats,
          [seatId]: !prevSelectedSeats[seatId],
        };
        const totalPrice = Object.keys(updatedSelectedSeats).reduce(
          (total, seatId) => {
            return (
              total +
              (updatedSelectedSeats[seatId] ? allSeatData[seatId].price : 0)
            );
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
  const generateSeats = (numRows, numColumns) => {
    let rows = [];

    // Headers and other UI elements can be defined here

    for (let rowIndex = 1; rowIndex <= numRows; rowIndex++) {
      let seats = [];

      for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
        const seatId = `${String.fromCharCode(65 + columnIndex)}${rowIndex}`;
        const seatInfo = allSeatData[seatId];

        if (!seatInfo) continue; // Skip if no data for this seat

        const isAvailable = seatInfo.available;
        const isSelected = selectedSeats[seatId];
        let seatContent =
          isBooking && isAvailable ? `$${seatInfo.price}` : seatId;

        const seat = (
          <span
            key={seatId}
            className={`seat ${isSelected ? "selected" : ""} ${
              isAvailable ? "" : "unavailable"
            } ${seatInfo.seatType}`}
            onClick={() => handleSeatClick(seatId)}
          >
            {seatContent}
          </span>
        );

        seats.push(seat);
      }

      rows.push(
        <div key={`row-${rowIndex}`} className="row">
          <div className="left-column">{seats.slice(0, numColumns / 2)}</div>
          <div className="aisle"></div>
          <div className="right-column">{seats.slice(numColumns / 2)}</div>
        </div>
      );
    }

    return rows;
  };

  return <div className="seatMap">{generateSeats(19, 4)}</div>;
};

export default SmallPlane;
