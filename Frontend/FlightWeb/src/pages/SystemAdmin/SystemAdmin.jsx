
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const SystemAdmin = () => {

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isNewFlightFormVisible, setNewFlightFormVisible] = useState(false);
  const [newFlightDetails, setNewFlightDetails] = useState({
    departingTime: "",
    arrivingTime: "",
    departureLocation: "",
    arrivalLocation: "",
    crew: "",
    aircraft: "",
  });

  const [searchDate, setSearchDate] = useState("");
  const [searchedFlights, setSearchedFlights] = useState([]);
  const [getFlights, setGetFlights] = useState([]);
  const [admin, setAdmin] = useState(localStorage.getItem("admin") || false);
  useEffect(() => {
    if (admin == false) {
      window.location.href = "/signin-admin";
    }
  }, []);

  const [flightsData, setFlightsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getFlight")
      .then((response) => {
        // Map the API data to the format you need
        const formattedData = response.data.map(apiFlight => ({
          id: apiFlight.id.toString(),
          details: {
            date: apiFlight.departureDate.substring(0, 10), // Using departureDate as date for now
            departingTime: apiFlight.departureTime,
            arrivingTime: apiFlight.arrivalTime,
            departureLocation: apiFlight.departureAirport,
            arrivalLocation: apiFlight.arrivalAirport,
            leavingTime: apiFlight.departureTime,
            arriveBackTime: apiFlight.arrivalTime, 
            leavingLocation: apiFlight.departureAirport,
            arriveBackLocation: apiFlight.arrivalAirport,
          },
        }));

        setFlightsData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSearchDate = () => {
    const results = flightsData.filter(
      (flight) => flight.details.date === searchDate
    );
    setSearchedFlights(results);
  };

  const handleModifyFlight = (flightId) => {
    const flightToModify = flightsData.find((flight) => flight.id === flightId);
    setSelectedFlight(flightToModify);
    setNewFlightFormVisible(false);
  };
  const handleAddFlight = () => {
    setNewFlightFormVisible(true);
    setSelectedFlight(null);
  };

  const handleRemoveFlight = (flightId) => {
    const flightToRemove = flightsData.find((flight) => flight.id === flightId);
    if (flightToRemove) {
      const updatedFlightsData = flightsData.filter(
        (flight) => flight.id !== flightToRemove.id
      );
      setFlightsData(updatedFlightsData);
      setSelectedFlight(null);
    }
  };
  const handleSaveChanges = () => {
    const updatedFlightsData = flightsData.map((flight) => {
      if (flight.id === selectedFlight.id) {
        flight.details = selectedFlight.details;
      }
      return flight;
    });

    setFlightsData([...updatedFlightsData]);
    setSelectedFlight(null);
  };

  const handleInputChange = (event) => {
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
    const { name, value } = event.target;
    setNewFlightDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleAddNewFlight = () => {
    const lastElement = flightsData[flightsData.length - 1];
    const newId = lastElement ? (parseInt(lastElement.id) + 1).toString() : '1';
    const newFlight = {
      id: newId,
      details: { ...newFlightDetails },
    };

    setFlightsData([...flightsData, newFlight]);
    setNewFlightFormVisible(false);
  };

  return (
    <div>
      <h1>System Admin Page</h1>

      <TableContainer
        component={Paper}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Departing Time</TableCell>
              <TableCell>Arriving Time</TableCell>
              <TableCell>Departure Location</TableCell>
              <TableCell>Arrival Location</TableCell>
              <TableCell>Crew</TableCell>
              <TableCell>Aircraft</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flightsData.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.id}</TableCell>
                <TableCell>{flight.details.date}</TableCell>
                <TableCell>{flight.details.departingTime}</TableCell>
                <TableCell>{flight.details.arrivingTime}</TableCell>
                <TableCell>{flight.details.departureLocation}</TableCell>
                <TableCell>{flight.details.arrivalLocation}</TableCell>
                <TableCell>{flight.details.crew}</TableCell>
                <TableCell>{flight.details.aircraft}</TableCell>
                <TableCell>
                  <Button onClick={() => handleModifyFlight(flight.id)}>
                    Modify
                  </Button>
                  <Button onClick={() => handleRemoveFlight(flight.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "inline-block",
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
        <TextField
          label="Search Flights by Date"
          type="text"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          placeholder="Enter YYYY-MM-DD"
        />
        <Button variant="contained" color="primary" onClick={handleSearchDate}>
          Search
        </Button>
      </div>
      {searchedFlights.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Departing Time</TableCell>
                  <TableCell>Arriving Time</TableCell>
                  <TableCell>Departure Location</TableCell>
                  <TableCell>Arrival Location</TableCell>
                  <TableCell>Crew</TableCell>
                  <TableCell>Aircraft</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedFlights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>{flight.id}</TableCell>
                    <TableCell>{flight.details.date}</TableCell>
                    <TableCell>{flight.details.departingTime}</TableCell>
                    <TableCell>{flight.details.arrivingTime}</TableCell>
                    <TableCell>{flight.details.departureLocation}</TableCell>
                    <TableCell>{flight.details.arrivalLocation}</TableCell>
                    <TableCell>{flight.details.crew}</TableCell>
                    <TableCell>{flight.details.aircraft}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleModifyFlight(flight.id)}>
                        Modify
                      </Button>
                      <Button onClick={() => handleRemoveFlight(flight.id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <div>
        <Button variant="contained" color="primary" onClick={handleAddFlight}>
          Add Flight
        </Button>
      </div>

      <Dialog
        open={isNewFlightFormVisible}
        onClose={() => setNewFlightFormVisible(false)}
      >
        <DialogTitle>Add New Flight</DialogTitle>
        <DialogContent>
          <form>
            <div>
              <TextField
                label="Departing Time"
                type="text"
                name="departingTime"
                value={newFlightDetails.departingTime}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departing time"
              />
            </div>
            <div>
              <TextField
                label="Arriving Time"
                type="text"
                name="arrivingTime"
                value={newFlightDetails.arrivingTime}
                onChange={handleNewFlightInputChange}
                placeholder="Enter arriving time"
              />
            </div>
            <div>
              <TextField
                label="Departure Location"
                type="text"
                name="departureLocation"
                value={newFlightDetails.departureLocation}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departure location"
              />
            </div>
            <div>
              <TextField
                label="Arrival Location"
                type="text"
                name="arrivalLocation"
                value={newFlightDetails.arrivalLocation}
                onChange={handleNewFlightInputChange}
                placeholder="Enter arrival location"
              />
            </div>
            <div>
              <TextField
                label="Crew"
                type="text"
                name="crew"
                value={newFlightDetails.crew}
                onChange={handleNewFlightInputChange}
                placeholder="Enter crew"
              />
            </div>
            <div>
              <TextField
                label="Aircraft"
                type="text"
                name="aircraft"
                value={newFlightDetails.aircraft}
                onChange={handleNewFlightInputChange}
                placeholder="Enter aircraft"
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewFlight}
            >
              Add New Flight
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {selectedFlight && (
        <Dialog open={!!selectedFlight} onClose={() => setSelectedFlight(null)}>
          <DialogTitle>Modify Flight</DialogTitle>
          <DialogContent>
            <form>
              <div>
                <TextField
                  label="Departing Time"
                  type="text"
                  name="departingTime"
                  value={selectedFlight.details.departingTime}
                  onChange={handleInputChange}
                  placeholder="Enter departing time"
                />
              </div>
              <div>
                <TextField
                  label="Arriving Time"
                  type="text"
                  name="arrivingTime"
                  value={selectedFlight.details.arrivingTime}
                  onChange={handleInputChange}
                  placeholder="Enter arriving time"
                />
              </div>
              <div>
                <TextField
                  label="Departure Location"
                  type="text"
                  name="departureLocation"
                  value={selectedFlight.details.departureLocation}
                  onChange={handleInputChange}
                  placeholder="Enter departure location"
                />
              </div>
              <div>
                <TextField
                  label="Arrival Location"
                  type="text"
                  name="arrivalLocation"
                  value={selectedFlight.details.arrivalLocation}
                  onChange={handleInputChange}
                  placeholder="Enter arrival location"
                />
              </div>
              <div>
                <TextField
                  label="Crew"
                  type="text"
                  name="crew"
                  value={selectedFlight.details.crew}
                  onChange={handleInputChange}
                  placeholder="Enter crew"
                />
              </div>
              <div>
                <TextField
                  label="Aircraft"
                  type="text"
                  name="aircraft"
                  value={selectedFlight.details.aircraft}
                  onChange={handleInputChange}
                  placeholder="Enter aircraft"
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SystemAdmin;
