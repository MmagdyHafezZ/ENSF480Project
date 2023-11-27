// UserDataContext.js
import React, { useState, createContext, useContext } from "react";

// Create the context
export const UserDataContext = createContext();
export function useUserDataContext() {
  return useContext(UserDataContext);
}
// Create a provider component
export const UserDataProvider = ({ children }) => {
  const [userFlightData, setUserFlightData] = useState({
    leaving: "",
    going: "",
    travellers: "",
    depart: "",
    return: "",
  });
  const values = {
    userFlightData,
    setUserFlightData,
  };
  return (
    <UserDataContext.Provider value={values}>
      {children}
    </UserDataContext.Provider>
  );
};
