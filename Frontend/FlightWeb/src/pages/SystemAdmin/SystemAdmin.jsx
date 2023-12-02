import SystemAdminHeader from "./SystemAdminHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
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
    searchbookingid: {
      id: "",
      iataorigin: "",
      iatadest: "",
      travellers: 0,
      departing: "",
      returning: "",
    },
    departdate: "",
    returndate: "",
    departtime: "",
    returntime: "",
    iataorigin: "",
    iatadest: "",
    model: "",
    modelid: "",
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/getFlightList")
      .then((response) => {
        const formattedData = response.data.map((apiFlight) => ({
          id: apiFlight.id.toString(),
          searchbookingid: apiFlight.searchbookingid,
          departdate: apiFlight.departdate,
          returndate: apiFlight.returndate,
          departtime: apiFlight.departtime,
          returntime: apiFlight.returndate,
          iataorigin: apiFlight.iataorigin,
          iatadest: apiFlight.iatadest,
          model: apiFlight.model,
          modelid: apiFlight.modelid,
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
        (flight) => flight.departdate === formattedSearchDate,
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
        (flight) => flight.departdate === formattedSearchDate,
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
            prevFlightsData.filter((flight) => flight.id !== flightToRemove.id),
          );
          setSelectedFlight(null);
          setSearchedFlights((prevSearchedFlights) =>
            prevSearchedFlights.filter((flight) => flight.id !== flightId),
          );
        })
        .catch((error) => {
          console.error("Error removing flight: ", error);
        });
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Move the Axios PUT request here, outside the loop
      const response = await axios.put(
        `http://localhost:8080/putFlightList/${selectedFlight.id}`,
        {
          searchbookingid: selectedFlight.searchbookingid,
          departdate: selectedFlight.departdate,
          returndate: selectedFlight.returndate,
          departtime: selectedFlight.departtime,
          returntime: selectedFlight.returntime,
          iataorigin: selectedFlight.iataorigin,
          iatadest: selectedFlight.iatadest,
          model: selectedFlight.model,
          modelid: selectedFlight.modelid,
        },
      );

      // Update the state after the request is successful
      setFlightsData((prevFlightsData) =>
        prevFlightsData.map((prevFlight) =>
          prevFlight.id === selectedFlight.id ? response.data : prevFlight,
        ),
      );
      setSelectedFlight(null);
    } catch (error) {
      console.error("Error updating flight: ", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedFlight((prevFlight) => ({
      ...prevFlight,
      [name]: value,
    }));
  };

  const handleNewFlightInputChange = (event) => {
    const { name, value } = event.target;

    setNewFlightDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddNewFlight = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/postFlightList",
        newFlightDetails,
      );

      const newFlight = {
        id: response.data.id.toString(),
        searchbookingid: {
          id: response.data.searchbookingid.id,
          iataorigin: response.data.searchbookingid.iataorigin,
          iatadest: response.data.searchbookingid.iatadest,
          travellers: response.data.searchbookingid.travellers,
          departing: response.data.searchbookingid.departing,
          returning: response.data.searchbookingid.returning,
        },
        iataorigin: response.data.iataorigin,
        iatadest: response.data.iatadest,
        departdate: response.data.departdate,
        returndate: response.data.returndate,
        departtime: response.data.departtime,
        returntime: response.data.returntime,
        model: response.data.model,
        modelid: response.data.modelid,
      };

      // Update the state with the new flight details
      setFlightsData([...flightsData, newFlight]);
      setNewFlightFormVisible(false);

      if (searchClicked) {
        const formattedSearchDate = format(searchDate, "yyyy-MM-dd");
        const results = flightsData.filter(
          (flight) => flight.departdate === formattedSearchDate,
        );
        setSearchedFlights(results);
      }
    } catch (error) {
      console.error("Error adding new flight: ", error);
    }
  };

  return (
    <div>
      <SystemAdminHeader
        searchDate={searchDate}
        setSearchDate={setSearchDate}
        handleSearchDate={handleSearchDate}
        handleAddFlight={handleAddFlight}
      />
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
                    <TableCell>{flight.departdate}</TableCell>
                    <TableCell>{flight.returndate}</TableCell>
                    <TableCell>{flight.departtime}</TableCell>
                    <TableCell>{flight.returntime}</TableCell>
                    <TableCell>{flight.iataorigin}</TableCell>
                    <TableCell>{flight.iatadest}</TableCell>
                    <TableCell>{flight.crew}</TableCell>
                    <TableCell>{flight.model}</TableCell>
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
                      <TableCell>{flight.departdate}</TableCell>
                      <TableCell>{flight.returndate}</TableCell>
                      <TableCell>{flight.departtime}</TableCell>
                      <TableCell>{flight.returntime}</TableCell>
                      <TableCell>{flight.iataorigin}</TableCell>
                      <TableCell>{flight.iatadest}</TableCell>
                      <TableCell>{flight.crew}</TableCell>
                      <TableCell>
                        {flight.model + " " + flight.modelid}
                      </TableCell>
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
                name="departdate"
                value={newFlightDetails.departdate}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departure date"
              />
            </div>
            <div>
              <TextField
                label="Arrival Date"
                type="text"
                name="returndate"
                value={newFlightDetails.returndate}
                onChange={handleNewFlightInputChange}
                placeholder="Enter arrival date"
              />
            </div>
            <div>
              <TextField
                label="Departing Time"
                type="text"
                name="departtime"
                value={newFlightDetails.departtime}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departure time"
              />
            </div>
            <div>
              <TextField
                label="Arriving Time"
                type="text"
                name="returntime"
                value={newFlightDetails.returntime}
                onChange={handleNewFlightInputChange}
                placeholder="Enter arrival time"
              />
            </div>
            <div>
              <TextField
                label="Departure Location"
                type="text"
                name="iataorigin"
                value={newFlightDetails.iataorigin}
                onChange={handleNewFlightInputChange}
                placeholder="Enter departure location"
              />
            </div>
            <div>
              <TextField
                label="Arrival Location"
                type="text"
                name="iatadest"
                value={newFlightDetails.iatadest}
                onChange={handleNewFlightInputChange}
                placeholder="Enter arrival location"
              />
            </div>
            <div>
              <TextField
                label="Model name"
                type="text"
                name="model"
                value={newFlightDetails.model}
                onChange={handleNewFlightInputChange}
                placeholder="Enter model name"
              />
            </div>
            <div>
              <TextField
                label="Model id"
                type="text"
                name="modelid"
                value={newFlightDetails.modelid}
                onChange={handleNewFlightInputChange}
                placeholder="Enter model id"
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
                  label="Departure Date"
                  type="text"
                  name="departdate"
                  value={selectedFlight.departdate}
                  onChange={handleInputChange}
                  placeholder="Enter departure date"
                />
              </div>
              <div>
                <TextField
                  label="Arrival Date"
                  type="text"
                  name="returndate"
                  value={selectedFlight.returndate}
                  onChange={handleInputChange}
                  placeholder="Enter arrival date"
                />
              </div>
              <div>
                <TextField
                  label="Departure Time"
                  type="text"
                  name="departtime"
                  value={selectedFlight.departtime}
                  onChange={handleInputChange}
                  placeholder="Enter departure time"
                />
              </div>
              <div>
                <TextField
                  label="Arrival Time"
                  type="text"
                  name="returntime"
                  value={selectedFlight.returntime}
                  onChange={handleInputChange}
                  placeholder="Enter arrival time"
                />
              </div>
              <div>
                <TextField
                  label="Departure Location"
                  type="text"
                  name="iataorigin"
                  value={selectedFlight.iataorigin}
                  onChange={handleInputChange}
                  placeholder="Enter departure location"
                />
              </div>
              <div>
                <TextField
                  label="Arrival Location"
                  type="text"
                  name="iatadest"
                  value={selectedFlight.iatadest}
                  onChange={handleInputChange}
                  placeholder="Enter arrival location"
                />
              </div>
              <div>
                <TextField
                  label="Model Name"
                  type="text"
                  name="model"
                  value={selectedFlight.model}
                  onChange={handleInputChange}
                  placeholder="Enter model id"
                />
              </div>
              <div>
                <TextField
                  label="Model id"
                  type="text"
                  name="modelid"
                  value={selectedFlight.modelid}
                  onChange={handleInputChange}
                  placeholder="Enter model id"
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