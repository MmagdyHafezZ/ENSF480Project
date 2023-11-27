import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchLocationPopup = ({ placeholder, setLocation, setPopup }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/getAirport')
      .then(response => {
        setSearchResults(response.data),
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
    }, []);

  // const dummyData = [
  //   { name: "New York", iataCode: "JFK" },
  //   { name: "Los Angeles", iataCode: "LAX" },
  //   { name: "London", iataCode: "LHR" },
  //   { name: "Paris", iataCode: "CDG" },
  //   { name: "Tokyo", iataCode: "HND" },
  //   // Add more cities and codes as needed
  // ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredResults = searchResults.filter(
        (item) =>
          item.city.toLowerCase().includes(query.toLowerCase()) ||
          item.iata.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
      console.log()
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
              {result.city} - {result.iata}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchLocationPopup;
