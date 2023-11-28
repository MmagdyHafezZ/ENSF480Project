import React, { useState } from 'react';

const SystemAdmin = () => {
  const [flightsData, setFlightsData] = useState([
    {
      id: "1", // Unique identifier
      details: {
        airline: "Air Canada",
        date: "2023-11-10",
        departingTime: "4:30pm",
        arrivingTime: "7:30pm",
        departureLocation: "Calgary, AB",
        arrivalLocation: "Vancouver, BC",
        leavingTime: "2:30pm",
        arriveBackTime: "5:30pm",
        leavingLocation: "Vancouver, BC",
        arriveBackLocation: "Calgary, AB",
        price: "89$",
        crew: "crewA",
        aircraft: "aircraftA",
      },
    },
    {
      id: "2", // Unique identifier
      details: {
        airline: "United Airlines",
        date: "2023-11-10",
        departingTime: "6:00pm",
        arrivingTime: "9:00pm",
        departureLocation: "Los Angeles, CA",
        arrivalLocation: "New York, NY",
        leavingTime: "2:30pm",
        arriveBackTime: "5:30pm",
        leavingLocation: "Vancouver, BC",
        arriveBackLocation: "Calgary, AB",
        price: "120$",
        crew: "crewB",
        aircraft: "aircraftB",
      },
    },
    {
      id: "3", // Unique identifier
      details: {
        airline: "British Airways",
        date: "2023-11-12",
        departingTime: "10:00am",
        arrivingTime: "2:00pm",
        departureLocation: "London, UK",
        arrivalLocation: "Paris, FR",
        leavingTime: "2:30pm",
        arriveBackTime: "5:30pm",
        leavingLocation: "Vancouver, BC",
        arriveBackLocation: "Calgary, AB",
        price: "75£",
        crew: "crewC",
        aircraft: "aircraftC",
      },
    },
    // Add more flight objects with their respective details and unique IDs
  ]);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isNewFlightFormVisible, setNewFlightFormVisible] = useState(false);
  const [newFlightDetails, setNewFlightDetails] = useState({
    airline: '',
    departingTime: '',
    arrivingTime: '',
    departureLocation: '',
    arrivalLocation: '',
    price: '',
  });
  const [searchDate, setSearchDate] = useState(''); // State to store the search date
  const [searchedFlights, setSearchedFlights] = useState([]); // State to store the search results

  const handleSearch = () => {
    // Logic for searching flights based on the entered date
    const results = flightsData.filter((flight) => {
      // Assuming your flight details include a 'date' property
      return flight.details.date === searchDate;
    });

    setSearchedFlights(results);
  };

  const handleModifyFlight = (flightId) => {
    // Find the selected flight for modification
    const flightToModify = flightsData.find((flight) => flight.id === flightId);
    setSelectedFlight(flightToModify);
    setNewFlightFormVisible(false); // Close the new flight form
  };

  const handleAddFlight = () => {
    setNewFlightFormVisible(true);
    setSelectedFlight(null); // Close modify form if open
  };

  const handleRemoveFlight = (flightId) => {
    // Check if a flight is selected before removing
    const flightToRemove = flightsData.find((flight) => flight.id === flightId);

    if (flightToRemove) {
      // Dummy logic for removing the selected flight
      const updatedFlightsData = flightsData.filter(
        (flight) => flight.id !== flightToRemove.id
      );

      setFlightsData(updatedFlightsData);
      setSelectedFlight(null); // Reset selectedFlight after removal
    }
  };

  const handleSaveChanges = () => {
    // Dummy logic for saving changes
    const updatedFlightsData = flightsData.map((flight) => {
      if (flight.id === selectedFlight.id) {
        // Update the details with the modified values
        flight.details = selectedFlight.details;
      }
      return flight;
    });

    setFlightsData([...updatedFlightsData]);
    setSelectedFlight(null); // Reset selectedFlight after saving changes
  };

  const handleInputChange = (event) => {
    // Update the selectedFlight details as the user types
    const { name, value } = event.target;
    setSelectedFlight((prevFlight) => ({
      ...prevFlight,
      details: {
        ...prevFlight.details,
        [name]: value,
      },
    }));
  };

  const handleNewFlightInputChange = (event) => {
    // Update the newFlightDetails as the user types
    const { name, value } = event.target;
    setNewFlightDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddNewFlight = () => {
    // Dummy logic for adding a new flight
    const newFlight = {
      id: (flightsData.length + 1).toString(),
      details: { ...newFlightDetails },
    };

    setFlightsData([...flightsData, newFlight]);
    setNewFlightFormVisible(false); // Close the new flight form after adding
  };

  return (
    <div>
      <h1>System Admin Page</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Airline</th>
            <th>Date</th>
            <th>Departing Time</th>
            <th>Arriving Time</th>
            <th>Departure Location</th>
            <th>Arrival Location</th>
            <th>Price</th>
            <th>Crew</th>
            <th>Aircraft</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flightsData.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.details.airline}</td>
              <td>{flight.details.date}</td>
              <td>{flight.details.departingTime}</td>
              <td>{flight.details.arrivingTime}</td>
              <td>{flight.details.departureLocation}</td>
              <td>{flight.details.arrivalLocation}</td>
              <td>{flight.details.price}</td>
              <td>{flight.details.crew}</td>
              <td>{flight.details.aircraft}</td>
              <td>
                <button onClick={() => handleModifyFlight(flight.id)}>Modify</button>
              </td>
              <td>
                <button onClick={() => handleRemoveFlight(flight.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <label>
          Search Flights by Date:
          <input
            type="text"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="Enter YYYY-MM-DD"
          />
        </label>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {searchedFlights.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Airline</th>
                <th>Date</th>
                <th>Departing Time</th>
                <th>Arriving Time</th>
                <th>Departure Location</th>
                <th>Arrival Location</th>
                <th>Price</th>
                <th>Crew</th>
                <th>Aircraft</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchedFlights.map((flight) => (
                <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.details.airline}</td>
                <td>{flight.details.date}</td>
                <td>{flight.details.departingTime}</td>
                <td>{flight.details.arrivingTime}</td>
                <td>{flight.details.departureLocation}</td>
                <td>{flight.details.arrivalLocation}</td>
                <td>{flight.details.price}</td>
                <td>{flight.details.crew}</td>
                <td>{flight.details.aircraft}</td>
                <td>
                  <button onClick={() => handleModifyFlight(flight.id)}>Modify</button>
                </td>
                <td>
                  <button onClick={() => handleRemoveFlight(flight.id)}>Remove</button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}



      <div>
        <button type="button" onClick={handleAddFlight}>
          Add Flight
        </button>
      </div>

      {isNewFlightFormVisible && (
        <div>
          <h2>Add New Flight</h2>
          <form>
            <div>
            <label>
              Airline:
              <input
                type="text"
                name="airline"
                value={newFlightDetails.airline}
                onChange={handleNewFlightInputChange}
                placeholder="Enter airline"
              />
            </label>
            </div>
            <div>
            <label>
              Departing Time:
              <input
                type="text"
                name="departingTime"
                value={newFlightDetails.departingTime}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departing time"
              />
            </label>
            </div>
            <div>
            <label>
              Arriving Time:
              <input
                type="text"
                name="arrivingTime"
                value={newFlightDetails.arrivingTime}
                onChange={handleNewFlightInputChange}
                placeholder="Enter arriving time"
              />
            </label>
            </div>
            <div>
            <label>
              Departure Location:
              <input
                type="text"
                name="departureLocation"
                value={newFlightDetails.departureLocation}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departure location"
              />
            </label>
            </div>
            <div>
            <label>
              Arrival Location:
              <input
                type="text"
                name="arrivalLocation"
                value={newFlightDetails.arrivalLocation}
                onChange={handleNewFlightInputChange}
                placeholder="Enter arrival location"
              />
            </label>
            </div>
            <div>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={newFlightDetails.price}
                onChange={handleNewFlightInputChange}
                placeholder="Enter price"
              />
            </label>
            </div>
            <div>
            <label>
              Crew:
              <input
                type="text"
                name="crew"
                value={newFlightDetails.price}
                onChange={handleNewFlightInputChange}
                placeholder="Enter crew"
              />
            </label>
            </div>
            <div>
            <label>
              Aircraft:
              <input
                type="text"
                name="aircraft"
                value={newFlightDetails.price}
                onChange={handleNewFlightInputChange}
                placeholder="Enter aircraft"
              />
            </label>
            </div>
            <button type="button" onClick={handleAddNewFlight}>
              Add New Flight
            </button>
          </form>
        </div>
      )}

      {selectedFlight && (
        <div>
          <h2>Modify Flight</h2>
          <form>
            <div>
            <label>
              ID:
              <span>{` ${selectedFlight.id}`}</span>
            </label>
            </div>
            <div>
            <label>
              Airline:
              <span>{` ${selectedFlight.details.airline}`}</span>
            </label>
            </div>
            <div>
            <label>
              Departing Time:
              <input
                type="text"
                name="departingTime"
                value={selectedFlight.details.departingTime}
                onChange={handleInputChange}
              />
            </label>
            </div>
            <div>
            <label>
              Arriving Time:
              <input
                type="text"
                name="arrivingTime"
                value={selectedFlight.details.arrivingTime}
                onChange={handleInputChange}
              />
            </label>
            </div>
            <div>
            <label>
              Departure Location:
              <input
                type="text"
                name="departureLocation"
                value={selectedFlight.details.departureLocation}
                onChange={handleInputChange}
              />
            </label>
            </div>
            <div>
            <label>
              Arrival Location:
              <input
                type="text"
                name="arrivalLocation"
                value={selectedFlight.details.arrivalLocation}
                onChange={handleInputChange}
              />
            </label>
            </div>
            <div>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={selectedFlight.details.price}
                onChange={handleInputChange}
              />
            </label>
            </div>
            <div>
            <label>
              Crew:
              <input
                type="text"
                name="crew"
                value={selectedFlight.details.crew}
                onChange={handleInputChange}
              />
            </label>
            </div>
            <label>
              Aircraft:
              <input
                type="text"
                name="aircraft"
                value={selectedFlight.details.aircraft}
                onChange={handleInputChange}
              />
            </label>
            <div>
            <button type="button" onClick={handleSaveChanges}>
              Save Changes
            </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SystemAdmin;