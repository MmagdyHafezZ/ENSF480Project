import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Select, MenuItem } from "@mui/material";
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
  InputLabel,
} from "@mui/material";

const SystemAdmin = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isNewFlightFormVisible, setNewFlightFormVisible] = useState(false);
  const [newFlightDetails, setNewFlightDetails] = useState({
    departureDate: "",
    arrivalDate: "",
    departureTime: "",
    arrivalTime: "",
    departureAirport: "",
    arrivalAirport: "",
    aircraft: {
      id: "",
      aircraftType: "",
    },
  });
  const [searchDate, setSearchDate] = useState("");
  const [searchedFlights, setSearchedFlights] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [admin, setAdmin] = useState(localStorage.getItem("admin") || false);
  useEffect(() => {
    if (admin == false) {
      window.location.href = "/signin-admin";
    }
  }, []);
  const [flightsData, setFlightsData] = useState([]);
  const [editAircraftMode, setEditAircraftMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getFlight")
      .then((response) => {
        const formattedData = response.data.map(apiFlight => ({
          id: apiFlight.id.toString(),
          details: {
            departureDate: apiFlight.departureDate,
            arrivalDate: apiFlight.arrivalDate,
            departureTime: apiFlight.departureTime,
            arrivalTime: apiFlight.arrivalTime,
            departureAirport: apiFlight.departureAirport,
            arrivalAirport: apiFlight.arrivalAirport,
            aircraft: {
              id: apiFlight.aircraft ? apiFlight.aircraft.id.toString() : null,
            aircraftType: apiFlight.aircraft ? apiFlight.aircraft.aircraftType : null,
          },
          },
        }));

        setFlightsData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSearchDate = () => {
    if (!searchDate) {
      setSearchClicked(false);
      setSearchedFlights([]);
    } else {
      const formattedSearchDate = format(searchDate, "yyyy-MM-dd");
      const results = flightsData.filter(
        (flight) => flight.details.departureDate === formattedSearchDate
      );
      setSearchedFlights(results);
      setSearchClicked(true);
    }
  };

  const handleModifyFlight = (flightId) => {
    const flightToModify = flightsData.find((flight) => flight.id === flightId);

    if (flightToModify) {
      setSelectedFlight(flightToModify);
      setNewFlightFormVisible(false);
    }

    if (searchClicked) {
      const formattedSearchDate = format(searchDate, "yyyy-MM-dd");
      const results = flightsData.filter(
        (flight) => flight.details.departureDate === formattedSearchDate
      );
      setSearchedFlights(results);
    }
  };
  
  const handleAddFlight = () => {
    setNewFlightFormVisible(true);
    setSelectedFlight(null);
  };

  const handleRemoveFlight = (flightId) => {
    const flightToRemove = flightsData.find((flight) => flight.id === flightId);
    if (flightToRemove) {
      axios
        .delete(`http://localhost:8080/deleteFlight/${flightId}`)
        .then(() => {
          // Assuming the server successfully deletes the flight, update the state
          setFlightsData((prevFlightsData) =>
            prevFlightsData.filter((flight) => flight.id !== flightToRemove.id)
          );
          setSelectedFlight(null);
          setSearchedFlights((prevSearchedFlights) =>
            prevSearchedFlights.filter((flight) => flight.id !== flightId)
          );
        })
        .catch((error) => {
          console.error("Error removing flight: ", error);
        });
    }
  };  

  const handleSaveChanges = () => {
    const updatedFlightsData = flightsData.map((flight) => {
      if (flight.id === selectedFlight.id) {
        // Assuming details is an object
        flight.details = selectedFlight.details;
  
        // Send the modified flight details to the server
        axios.put(`http://localhost:8080/putFlight/${selectedFlight.id}`, {
          // Assuming the details structure is similar to the API data
          departureDate: selectedFlight.details.departureDate,
          arrivalDate: selectedFlight.details.arrivalDate,
          departureTime: selectedFlight.details.departureTime,
          arrivalTime: selectedFlight.details.arrivalTime,
          departureAirport: selectedFlight.details.departureAirport,
          arrivalAirport: selectedFlight.details.arrivalAirport,
          // Add more fields as needed
        })
          .then((response) => {
            // Assuming the server returns the updated flight
            const updatedFlight = response.data;
  
            // Update the state with the updated flight from the server
            setFlightsData((prevFlightsData) => prevFlightsData.map((prevFlight) =>
              (prevFlight.id === updatedFlight.id ? { ...prevFlight, details: updatedFlight.details } : prevFlight)
            ));
          })
          .catch((error) => {
            console.error('Error updating flight: ', error);
          });
      }

      if (searchClicked) {
        const formattedSearchDate = format(searchDate, "yyyy-MM-dd");
        const results = flightsData.filter(
          (flight) => flight.details.departureDate === formattedSearchDate
        );
        setSearchedFlights(results);
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
  
    if (name === "aircraft") {
      let aircraftType;

      switch (value) {
        case 1:
          aircraftType = "Embraer E175-E2";
          break;
        case 2:
          aircraftType = "Boeing 737 MAX 8";
          break;
        default:
          aircraftType = "";
      }
  
      // Update newFlightDetails with the selected aircraft details
      setNewFlightDetails((prevDetails) => ({
        ...prevDetails,
        aircraft: {
          id: value,
          aircraftType: aircraftType,
        },
      }));
    } else {
      // Handle other input changes
      setNewFlightDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };  

  const handleAddNewFlight = async () => {
    try {
      if (!newFlightDetails.aircraft || !newFlightDetails.aircraft.id) {
        alert("Please select an aircraft.");
        return;
      }
      const response = await axios.post("http://localhost:8080/postFlight", newFlightDetails);
  
      // Assuming the server successfully adds the new flight
      const newFlight = {
        id: response.data.id.toString(),
        details: { ...response.data }, // Use the data returned from the server
      };
  
      // Update the state with the new flight details
      setFlightsData([...flightsData, newFlight]);
      setNewFlightFormVisible(false);

      if (searchClicked) {
        const formattedSearchDate = format(searchDate, "yyyy-MM-dd");
        const results = flightsData.filter(
          (flight) => flight.details.departureDate === formattedSearchDate
        );
        setSearchedFlights(results);
      }
      
    } catch (error) {
      console.error("Error adding new flight: ", error);
    }
  };

  return (
    <div>
      <h1>System Admin Page</h1>
      <div
        style={{
          display: "block",
          marginRight: "10px",
          marginBottom: "10px",
        }}
      >
        <DatePicker
  selected={searchDate}
  onChange={(date) => setSearchDate(date)}
  dateFormat="yyyy-MM-dd"
  placeholderText="Select date"
/>

        <Button variant="contained" color="primary" onClick={handleSearchDate}>
          Search
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddFlight}>
          Add Flight
        </Button>
      </div>
      {searchedFlights.length > 0 ? (
        <div>
          <h2>Search Results</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Departure Date</TableCell>
                  <TableCell>Arrival Date</TableCell>
                  <TableCell>Departure Time</TableCell>
                  <TableCell>Arrival Time</TableCell>
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
                    <TableCell>{flight.details.departureDate}</TableCell>
                    <TableCell>{flight.details.arrivalDate}</TableCell>
                    <TableCell>{flight.details.departureTime}</TableCell>
                    <TableCell>{flight.details.arrivalTime}</TableCell>
                    <TableCell>{flight.details.departureAirport}</TableCell>
                    <TableCell>{flight.details.arrivalAirport}</TableCell>
                    <TableCell>{flight.details.crew}</TableCell>
                    <TableCell>{flight.details.aircraft.aircraftType}</TableCell>
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
      ) : (
        <>
      {searchedFlights.length === 0 && searchClicked ? (
        <div>
          <h2>No Results Found</h2>
        </div>
      ) : (
      <TableContainer
        component={Paper}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell>Arrival Date</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival Time</TableCell>
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
                <TableCell>{flight.details.departureDate}</TableCell>
                <TableCell>{flight.details.arrivalDate}</TableCell>
                <TableCell>{flight.details.departureTime}</TableCell>
                <TableCell>{flight.details.arrivalTime}</TableCell>
                <TableCell>{flight.details.departureAirport}</TableCell>
                <TableCell>{flight.details.arrivalAirport}</TableCell>
                <TableCell>{flight.details.crew}</TableCell>
                <TableCell>{flight.details.aircraft.aircraftType}</TableCell>
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
      )}
      </>
      )}

      <Dialog
        open={isNewFlightFormVisible}
        onClose={() => setNewFlightFormVisible(false)}
      >
        <DialogTitle>Add New Flight</DialogTitle>
        <DialogContent>
          <form>
            <div>
              <TextField
                label="Departure Date"
                type="text"
                name="departureDate"
                value={newFlightDetails.departureDate}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departure date"
              />
            </div>
            <div>
              <TextField
                label="Arrival Date"
                type="text"
                name="arrivalDate"
                value={newFlightDetails.arrivalDate}
                onChange={handleNewFlightInputChange}
                placeholder="Enter arrival date"
              />
            </div>
            <div>
              <TextField
                label="Departing Time"
                type="text"
                name="departureTime"
                value={newFlightDetails.departureTime}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departure time"
              />
            </div>
            <div>
              <TextField
                label="Arriving Time"
                type="text"
                name="arrivalTime"
                value={newFlightDetails.arrivalTime}
                onChange={handleNewFlightInputChange}
                placeholder="Enter arrival time"
              />
            </div>
            <div>
              <TextField
                label="Departure Location"
                type="text"
                name="departureAirport"
                value={newFlightDetails.departureAirport}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departure location"
              />
            </div>
            <div>
              <TextField
                label="Arrival Location"
                type="text"
                name="arrivalAirport"
                value={newFlightDetails.arrivalAirport}
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
                <InputLabel>Aircraft</InputLabel>
                <Select
                    label="Aircraft"
                    name="aircraft"
                    value={newFlightDetails.aircraft.id}
                    onChange={handleNewFlightInputChange}
                >
                <MenuItem value={1}>Embraer E175-E2</MenuItem>
                <MenuItem value={2}>Boeing 737 MAX 8</MenuItem>
                </Select>
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
                  label="Departure Date"
                  type="text"
                  name="departureDate"
                  value={selectedFlight.details.departureDate}
                  onChange={handleInputChange}
                  placeholder="Enter departure time"
                />
              </div>
              <div>
                <TextField
                  label="Arrival Date"
                  type="text"
                  name="arrivalDate"
                  value={selectedFlight.details.arrivalDate}
                  onChange={handleInputChange}
                  placeholder="Enter departure time"
                />
              </div>
              <div>
                <TextField
                  label="Departure Time"
                  type="text"
                  name="departureTime"
                  value={selectedFlight.details.departureTime}
                  onChange={handleInputChange}
                  placeholder="Enter departure time"
                />
              </div>
              <div>
                <TextField
                  label="Arrival Time"
                  type="text"
                  name="arrivalTime"
                  value={selectedFlight.details.arrivalTime}
                  onChange={handleInputChange}
                  placeholder="Enter arrival time"
                />
              </div>
              <div>
                <TextField
                  label="Departure Location"
                  type="text"
                  name="departureAirport"
                  value={selectedFlight.details.departureAirport}
                  onChange={handleInputChange}
                  placeholder="Enter departure location"
                />
              </div>
              <div>
                <TextField
                  label="Arrival Location"
                  type="text"
                  name="arrivalAirport"
                  value={selectedFlight.details.arrivalAirport}
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