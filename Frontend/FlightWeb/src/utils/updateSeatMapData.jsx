import axios from "axios";

const updateSeatMapData = async (originalSeatMap, flightId) => {
  try {
    // Use the new API endpoint with the flightId
    const response = await axios.get(
      `http://localhost:8080/getSeatsByFlightId/flightId=${flightId}`
    );
    const apiData = response.data;

    // Clone the original seat map to avoid mutating the original data
    const updatedSeatMap = { ...originalSeatMap };

    // Iterate over the API data and update the seat map
    apiData.forEach((seat) => {
      const seatId = seat.seatID;

      // If the seat exists in the original map, update its details
      if (updatedSeatMap[seatId]) {
        updatedSeatMap[seatId] = {
          ...updatedSeatMap[seatId],
          available: seat.isAvailable,
          // Use API price if it's different from the original, else keep the original
          price:
            updatedSeatMap[seatId].price !==
            seat.flight[`${seat.seatType}Price`]
              ? seat.flight[`${seat.seatType}Price`]
              : updatedSeatMap[seatId].price,
          type: seat.seatType, // Update the seat type if necessary
        };
      } else {
        // If the seat is not in the original map, add it
        updatedSeatMap[seatId] = {
          available: seat.isAvailable,
          price: seat.flight[`${seat.seatType}Price`],
          type: seat.seatType,
        };
      }
    });

    return updatedSeatMap;
  } catch (error) {
    console.error("Error fetching seat data from API:", error);
    // Return the original data in case of an error
    return originalSeatMap;
  }
};

export default updateSeatMapData;
