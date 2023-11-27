import React, { useState } from "react";
import axios from "axios";

const SearchLocationPopup = ({ placeholder, setLocation, setPopup }) => {
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
            <li
              key={index}
              onClick={() => {
                handleSearchCity(result);
                // setLocation(e);
                // setPopup((prev) => !prev);
              }}
            >
              {result.name} - {result.iataCode}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchLocationPopup;
