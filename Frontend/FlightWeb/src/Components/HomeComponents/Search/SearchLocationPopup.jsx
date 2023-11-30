// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useUserDataContext } from "../../../context/UserDataContext.jsx";

// const SearchLocationPopup = ({
//   placeholder,
//   setLocation,
//   setPopup,
//   type,
//   value,
//   setData,
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/getAirport")
//       .then((response) => {
//         setSearchResults(response.data), console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   }, []);

//   // const dummyData = [
//   //   { name: "New York", iata: "JFK" },
//   //   { name: "Los Angeles", iata: "LAX" },
//   //   { name: "London", iataCode: "LHR" },
//   //   { name: "Paris", iataCode: "CDG" },
//   //   { name: "Tokyo", iataCode: "HND" },
//   //   // Add more cities and codes as needed
//   // ];

//   function handleSelectLocation(location) {
//     console.log(location);
//     setData((prevData) => ({
//       ...prevData,
//       [type]: location, // 'type' can be 'leaving' or 'going'
//     }));
//     setPopup((prev) => !prev);
//   }

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query) {
//       const filteredResults = searchResults.filter(
//         (item) =>
//           item.city.toLowerCase().includes(query.toLowerCase()) ||
//           item.iata.toLowerCase().includes(query.toLowerCase())
//       );
//       setSearchResults(filteredResults);
//       console.log();
//     } else {
//       setSearchResults([]);
//     }
//   };
//   function handleSearchCity(e) {
//     setLocation(e);
//     setPopup((prev) => !prev);
//   }
//   const handlePopupClick = (event) => {
//     event.stopPropagation(); // This stops the click event from reaching the parent
//   };

//   return (
//     <div className="search-location-popup" onClick={handlePopupClick}>
//       <div className="search-location-popup__container">
//         <input
//           className="location-popup-placeholder"
//           type="text"
//           placeholder={placeholder}
//           value={searchQuery}
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//         <ul>
//           {searchResults.map((result, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 handleSearchCity(result);
//                 // setLocation(e);
//                 // setPopup((prev) => !prev);
//               }}
//             >
//               {result.city} - {result.iata}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SearchLocationPopup;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUserDataContext } from "../../../context/UserDataContext.jsx";

const SearchLocationPopup = ({
  placeholder,
  setLocation,
  setPopup,
  type,
  value,
  setData,
  ref,
  popupState,
}) => {
  const outClick = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getAirport")
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    function handleClickOutsidePopup(event) {
      if (outClick.current && !outClick.current.contains(event.target)) {
        setPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsidePopup);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePopup);
    };
  }, [setPopup]);

  const dummyData = [
    { city: "New York", iata: "JFK" },
    { city: "Los Angeles", iata: "LAX" },
    { city: "London", iata: "LHR" },
    { city: "Paris", iata: "CDG" },
    { city: "Tokyo", iata: "HND" },
    { city: "Calgary", iata: "YYC" },
    { city: "Fort McMurray", iata: "YMM" }, // Fort McMurray, Alberta, Canada
    { city: "Vancouver", iata: "YVR" }, // Vancouver, British Columbia, Canada
    { city: "Seattle", iata: "SEA" }, // Seattle, Washington, USA
    { city: "Birmingham", iata: "BHX" }, // Birmingham, England, UK
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
          item.city.toLowerCase().includes(query.toLowerCase()) ||
          item.iata.toLowerCase().includes(query.toLowerCase())
      );
      setDestinations(filteredResults);
      console.log();
    } else {
      setDestinations([]);
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
    <div
      className={`search-location-popup ${
        popupState ? "location-popup-active" : ""
      }`}
      ref={outClick}
      onClick={handlePopupClick}
    >
      <div className="search-location-popup__container">
        <input
          className="location-popup-placeholder"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ul>
          {destinations.map((result, index) => (
            <li
              className="list"
              key={index}
              onClick={() => {
                handleSelectLocation(result);
                // setLocation(e);
                // setPopup((prev) => !prev);
              }}
            >
              {result.iata} - {result.city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchLocationPopup;
