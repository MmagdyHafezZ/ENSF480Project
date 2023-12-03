// Helper function to update seat map data with backend data
import axios from "axios";
const updateSeatMapData = async (originalSeatMap) => {
  try {
    // Replace with your actual API endpoint
    const response = await axios.get("https://api.example.com/seats");
    const apiData = response.data;

    // Clone the original seat map to avoid mutating the original data
    const updatedSeatMap = { ...originalSeatMap };

    // Update each seat with data from the API
    for (const seatId in updatedSeatMap) {
      if (apiData[seatId]) {
        updatedSeatMap[seatId] = {
          ...updatedSeatMap[seatId],
          available: apiData[seatId].available,
          price: apiData[seatId].price,
        };
      }
    }

    return updatedSeatMap;
  } catch (error) {
    console.error("Error fetching seat data from API:", error);
    // Return the original data in case of an error
    return originalSeatMap;
  }
};

export default updateSeatMapData;
