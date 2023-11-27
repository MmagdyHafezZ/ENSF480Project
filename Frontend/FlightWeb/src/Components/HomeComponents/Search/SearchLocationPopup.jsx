import React, { useState } from "react";
import axios from "axios";
import { useUserDataContext } from "../../../context/UserDataContext.jsx";

const SearchLocationPopup = ({
  placeholder,
  setLocation,
  setPopup,
  type,
  value,
  setData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dummyData = [
    { name: "New York", iataCode: "JFK" },
    { name: "Los Angeles", iataCode: "LAX" },
    { name: "London", iataCode: "LHR" },
    { name: "Paris", iataCode: "CDG" },
    { name: "Tokyo", iataCode: "HND" },
    // Add more cities and codes as needed
  ];
  function handleSelectLocation(location) {
    console.log(location);
    setData((prevData) => ({
      ...prevData,
      [type]: location, // 'type' can be 'leaving' or 'going'
    }));
    setPopup((prev) => !prev);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredResults = dummyData.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.iataCode.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };
  function handleSearchCity(e) {
    setLocation(e);
    setPopup((prev) => !prev);
  }
  const handlePopupClick = (event) => {
    event.stopPropagation(); // This stops the click event from reaching the parent
  };

  return (
    <div className="search-location-popup" onClick={handlePopupClick}>
      <div className="search-location-popup__container">
        <input
          className="location-popup-placeholder"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ul>
          {searchResults.map((result, index) => (
            <li key={index} onClick={() => handleSelectLocation(result)}>
              {result.name} - {result.iataCode}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchLocationPopup;
