// UserDataContext.js
import React, { useState, createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Create the context
export const UserDataContext = createContext();
export function useUserDataContext() {
  return useContext(UserDataContext);
}
// Create a provider component
export const UserDataProvider = ({ children }) => {
  const [userFlightData, setUserFlightData] = useState(
    JSON.parse(localStorage.getItem("userFlightData")) || {
      leaving: { name: "", iata: "" },
      going: { name: "", iata: "" },
      travellers: 0,
      depart: "",
      return: "",
    }
  );
  const [searchState, setSearchState] = useState(false);
  const saveFlightDataToLocalStorage = () => {
    const userFlightDataCopy = { ...userFlightData };
    userFlightDataCopy.depart = userFlightDataCopy.depart.toString();
    userFlightDataCopy.return = userFlightDataCopy.return.toString();

    localStorage.setItem("userFlightData", JSON.stringify(userFlightDataCopy));
  };
  const location = useLocation();
  useEffect(() => {
    // Retrieve the userFlightData from localStorage
    const storedData = localStorage.getItem("userFlightData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      // Convert date strings back to Date objects
      parsedData.depart = new Date(parsedData.depart);
      parsedData.return = new Date(parsedData.return);
      console.log(parsedData.depart);
      setUserFlightData(parsedData);
    }
  }, [location.pathname]);

  // Use useEffect to clear local storage when the URL is at '/'
  useEffect(() => {
    if (location.pathname === "/") {
      // Clear local storage here
      localStorage.removeItem("userFlightData");
      // Optionally, you can also clear other data from local storage if needed
      // localStorage.removeItem("isLoggedIn");
    }
  }, [location.pathname]);

  const values = {
    userFlightData,
    setUserFlightData,
    saveFlightDataToLocalStorage,
    searchState,
    setSearchState,
  };
  return (
    <UserDataContext.Provider value={values}>
      {children}
    </UserDataContext.Provider>
  );
};
