// UserDataContext.js
import { parse } from "date-fns";
import React, { useState, createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Create the context
export const UserDataContext = createContext();
export function useUserDataContext() {
  return useContext(UserDataContext);
}
// Create a provider component
export const UserDataProvider = ({ children }) => {
  const getFromSessionStorage = () => {
    const storedData = sessionStorage.getItem("userFlightData");
    if (!storedData) return null;

    const parsedData = JSON.parse(storedData);
    // Convert date strings back to Date objects
    if (parsedData.depart) {
      parsedData.depart = new Date(parsedData.depart);
    }
    if (parsedData.return) {
      parsedData.return = new Date(parsedData.return);
    }

    return parsedData;
  };

  const [userFlightData, setUserFlightData] = useState(
    getFromSessionStorage() || {
      leaving: { name: "", iata: "" },
      going: { name: "", iata: "" },
      travellers: 0,
      depart: "",
      return: "",
    }
  );

  const [selectedSeats, setSelectedSeats] = useState({});
  const [price, setPrice] = useState(0); // Initialize price with 0
  const [searchState, setSearchState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true); // Start loading

    // Set a timeout to simulate loading time
    setTimeout(() => {
      setIsLoading(false); // End loading after a delay
    }, 1000); // 2000 milliseconds = 2 seconds
  };
  const saveFlightDataTosessionStorage = () => {
    const userFlightDataCopy = { ...userFlightData };
    userFlightDataCopy.depart = userFlightDataCopy.depart.toString();
    userFlightDataCopy.return = userFlightDataCopy.return.toString();

    sessionStorage.setItem(
      "userFlightData",
      JSON.stringify(userFlightDataCopy)
    );
  };
  const location = useLocation();
  useEffect(() => {
    document.body.classList.remove("no-scroll");
    // Retrieve the userFlightData from sessionStorage
    const storedData = sessionStorage.getItem("userFlightData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      // Convert date strings back to Date objects
      parsedData.depart = new Date(parsedData.depart);
      parsedData.return = new Date(parsedData.return);
      // console.log(parsedData.depart);
      setUserFlightData(parsedData);
    }
  }, [location.pathname]);
  console.log("");
  useEffect(() => {
    console.log("resetting");
    if (location.pathname === "/") {
      // Reset userFlightData to its initial state
      setUserFlightData({
        leaving: { name: "", iata: "" },
        going: { name: "", iata: "" },
        travellers: 0,
        depart: "",
        return: "",
      });

      // Also, clear it from sessionStorage
      sessionStorage.removeItem("userFlightData");
    }
  }, []);

  const [isLoggedInContext, setIsLoggedInContext] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  // Use useEffect to clear local storage when the URL is at '/'

  const values = {
    userFlightData,
    setUserFlightData,
    saveFlightDataTosessionStorage,
    searchState,
    setSearchState,
    selectedSeats,
    setSelectedSeats,
    price,
    setPrice,
    isLoggedInContext,
    setIsLoggedInContext,
    handleButtonClick,
    isLoading,
    setIsLoading,
  };
  return (
    <UserDataContext.Provider value={values}>
      {children}
    </UserDataContext.Provider>
  );
};
