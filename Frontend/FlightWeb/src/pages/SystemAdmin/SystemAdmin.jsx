// import React, { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
// } from '@material-ui/core';

const SystemAdmin = () => {
  //     const [flightsData, setFlightsData] = useState([
  //       {
  //         id: "1", // Unique identifier
  //         details: {
  //           airline: "Air Canada",
  //           date: "2023-11-10",
  //           departingTime: "4:30pm",
  //           arrivingTime: "7:30pm",
  //           departureLocation: "Calgary, AB",
  //           arrivalLocation: "Vancouver, BC",
  //           leavingTime: "2:30pm",
  //           arriveBackTime: "5:30pm",
  //           leavingLocation: "Vancouver, BC",
  //           arriveBackLocation: "Calgary, AB",
  //           price: "89$",
  //           crew: "crewA",
  //           aircraft: "aircraftA",
  //         },
  //       },
  //       {
  //         id: "2", // Unique identifier
  //         details: {
  //           airline: "United Airlines",
  //           date: "2023-11-10",
  //           departingTime: "6:00pm",
  //           arrivingTime: "9:00pm",
  //           departureLocation: "Los Angeles, CA",
  //           arrivalLocation: "New York, NY",
  //           leavingTime: "2:30pm",
  //           arriveBackTime: "5:30pm",
  //           leavingLocation: "Vancouver, BC",
  //           arriveBackLocation: "Calgary, AB",
  //           price: "120$",
  //           crew: "crewB",
  //           aircraft: "aircraftB",
  //         },
  //       },
  //       {
  //         id: "3", // Unique identifier
  //         details: {
  //           airline: "British Airways",
  //           date: "2023-11-12",
  //           departingTime: "10:00am",
  //           arrivingTime: "2:00pm",
  //           departureLocation: "London, UK",
  //           arrivalLocation: "Paris, FR",
  //           leavingTime: "2:30pm",
  //           arriveBackTime: "5:30pm",
  //           leavingLocation: "Vancouver, BC",
  //           arriveBackLocation: "Calgary, AB",
  //           price: "75£",
  //           crew: "crewC",
  //           aircraft: "aircraftC",
  //         },
  //       },
  //       // Add more flight objects with their respective details and unique IDs
  //     ]);
  //   const [selectedFlight, setSelectedFlight] = useState(null);
  //   const [isNewFlightFormVisible, setNewFlightFormVisible] = useState(false);
  //   const [newFlightDetails, setNewFlightDetails] = useState({
  //     airline: '',
  //     departingTime: '',
  //     arrivingTime: '',
  //     departureLocation: '',
  //     arrivalLocation: '',
  //     price: '',
  //     crew: '',
  //     aircraft: '',
  //   });
  //   const [searchDate, setSearchDate] = useState('');
  //   const [searchedFlights, setSearchedFlights] = useState([]);
  //   const handleSearchDate = () => {
  //     const results = flightsData.filter((flight) => flight.details.date === searchDate);
  //     setSearchedFlights(results);
  //   };
  //   const handleModifyFlight = (flightId) => {
  //     const flightToModify = flightsData.find((flight) => flight.id === flightId);
  //     setSelectedFlight(flightToModify);
  //     setNewFlightFormVisible(false);
  //   };
  //   const handleAddFlight = () => {
  //     setNewFlightFormVisible(true);
  //     setSelectedFlight(null);
  //   };
  //   const handleRemoveFlight = (flightId) => {
  //     const flightToRemove = flightsData.find((flight) => flight.id === flightId);
  //     if (flightToRemove) {
  //       const updatedFlightsData = flightsData.filter((flight) => flight.id !== flightToRemove.id);
  //       setFlightsData(updatedFlightsData);
  //       setSelectedFlight(null);
  //     }
  //   };
  //   const handleSaveChanges = () => {
  //     const updatedFlightsData = flightsData.map((flight) => {
  //       if (flight.id === selectedFlight.id) {
  //         flight.details = selectedFlight.details;
  //       }
  //       return flight;
  //     });
  //     setFlightsData([...updatedFlightsData]);
  //     setSelectedFlight(null);
  //   };
  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setSelectedFlight((prevFlight) => ({
  //       ...prevFlight,
  //       details: {
  //         ...prevFlight.details,
  //         [name]: value,
  //       },
  //     }));
  //   };
  //   const handleNewFlightInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setNewFlightDetails((prevDetails) => ({
  //       ...prevDetails,
  //       [name]: value,
  //     }));
  //   };
  //   const handleAddNewFlight = () => {
  //     const newFlight = {
  //       id: (flightsData.length + 1).toString(),
  //       details: { ...newFlightDetails },
  //     };
  //     setFlightsData([...flightsData, newFlight]);
  //     setNewFlightFormVisible(false);
  //   };
  //   return (
  //     <div>
  //       <h1>System Admin Page</h1>
  //       <TableContainer component={Paper} style={{ marginBottom: '20px', padding: '10px' }}>
  //         <Table>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>ID</TableCell>
  //               <TableCell>Airline</TableCell>
  //               <TableCell>Date</TableCell>
  //               <TableCell>Departing Time</TableCell>
  //               <TableCell>Arriving Time</TableCell>
  //               <TableCell>Departure Location</TableCell>
  //               <TableCell>Arrival Location</TableCell>
  //               <TableCell>Price</TableCell>
  //               <TableCell>Crew</TableCell>
  //               <TableCell>Aircraft</TableCell>
  //               <TableCell>Action</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {flightsData.map((flight) => (
  //               <TableRow key={flight.id}>
  //                 <TableCell>{flight.id}</TableCell>
  //                 <TableCell>{flight.details.airline}</TableCell>
  //                 <TableCell>{flight.details.date}</TableCell>
  //                 <TableCell>{flight.details.departingTime}</TableCell>
  //                 <TableCell>{flight.details.arrivingTime}</TableCell>
  //                 <TableCell>{flight.details.departureLocation}</TableCell>
  //                 <TableCell>{flight.details.arrivalLocation}</TableCell>
  //                 <TableCell>{flight.details.price}</TableCell>
  //                 <TableCell>{flight.details.crew}</TableCell>
  //                 <TableCell>{flight.details.aircraft}</TableCell>
  //                 <TableCell>
  //                   <Button onClick={() => handleModifyFlight(flight.id)}>Modify</Button>
  //                   <Button onClick={() => handleRemoveFlight(flight.id)}>Remove</Button>
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //       <div style={{ display: 'inline-block', marginRight: '10px', marginBottom: '10px'}}>
  //         <TextField
  //           label="Search Flights by Date"
  //           type="text"
  //           value={searchDate}
  //           onChange={(e) => setSearchDate(e.target.value)}
  //           placeholder="Enter YYYY-MM-DD"
  //         />
  //         <Button variant="contained" color="primary" onClick={handleSearchDate}>
  //           Search
  //         </Button>
  //       </div>
  //       {searchedFlights.length > 0 && (
  //         <div>
  //           <h2>Search Results</h2>
  //           <TableContainer component={Paper}>
  //             <Table>
  //               <TableHead>
  //                 <TableRow>
  //                   <TableCell>ID</TableCell>
  //                   <TableCell>Airline</TableCell>
  //                   <TableCell>Date</TableCell>
  //                   <TableCell>Departing Time</TableCell>
  //                   <TableCell>Arriving Time</TableCell>
  //                   <TableCell>Departure Location</TableCell>
  //                   <TableCell>Arrival Location</TableCell>
  //                   <TableCell>Price</TableCell>
  //                   <TableCell>Crew</TableCell>
  //                   <TableCell>Aircraft</TableCell>
  //                   <TableCell>Action</TableCell>
  //                 </TableRow>
  //               </TableHead>
  //               <TableBody>
  //                 {searchedFlights.map((flight) => (
  //                   <TableRow key={flight.id}>
  //                     <TableCell>{flight.id}</TableCell>
  //                     <TableCell>{flight.details.airline}</TableCell>
  //                     <TableCell>{flight.details.date}</TableCell>
  //                     <TableCell>{flight.details.departingTime}</TableCell>
  //                     <TableCell>{flight.details.arrivingTime}</TableCell>
  //                     <TableCell>{flight.details.departureLocation}</TableCell>
  //                     <TableCell>{flight.details.arrivalLocation}</TableCell>
  //                     <TableCell>{flight.details.price}</TableCell>
  //                     <TableCell>{flight.details.crew}</TableCell>
  //                     <TableCell>{flight.details.aircraft}</TableCell>
  //                     <TableCell>
  //                       <Button onClick={() => handleModifyFlight(flight.id)}>Modify</Button>
  //                       <Button onClick={() => handleRemoveFlight(flight.id)}>Remove</Button>
  //                     </TableCell>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           </TableContainer>
  //         </div>
  //       )}
  //       <div>
  //         <Button variant="contained" color="primary" onClick={handleAddFlight}>
  //           Add Flight
  //         </Button>
  //       </div>
  //       {isNewFlightFormVisible && (
  //         <div>
  //           <h2>Add New Flight</h2>
  //           <form>
  //             <div>
  //               <TextField
  //                 label="Airline"
  //                 type="text"
  //                 name="airline"
  //                 value={newFlightDetails.airline}
  //                 onChange={handleNewFlightInputChange}
  //                 placeholder="Enter airline"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Departing Time"
  //                 type="text"
  //                 name="departingTime"
  //                 value={newFlightDetails.departingTime}
  //                 onChange={handleNewFlightInputChange}
  //                 placeholder="Enter departing time"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Arriving Time"
  //                 type="text"
  //                 name="arrivingTime"
  //                 value={newFlightDetails.arrivingTime}
  //                 onChange={handleNewFlightInputChange}
  //                 placeholder="Enter arriving time"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Departure Location"
  //                 type="text"
  //                 name="departureLocation"
  //                 value={newFlightDetails.departureLocation}
  //                 onChange={handleNewFlightInputChange}
  //                 placeholder="Enter departure location"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Arrival Location"
  //                 type="text"
  //                 name="arrivalLocation"
  //                 value={newFlightDetails.arrivalLocation}
  //                 onChange={handleNewFlightInputChange}
  //                 placeholder="Enter arrival location"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Price"
  //                 type="text"
  //                 name="price"
  //                 value={newFlightDetails.price}
  //                 onChange={handleNewFlightInputChange}
  //                 placeholder="Enter price"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Crew"
  //                 type="text"
  //                 name="crew"
  //                 value={newFlightDetails.crew}
  //                 onChange={handleNewFlightInputChange}
  //                 placeholder="Enter crew"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Aircraft"
  //                 type="text"
  //                 name="aircraft"
  //                 value={newFlightDetails.aircraft}
  //                 onChange={handleNewFlightInputChange}
  //                 placeholder="Enter aircraft"
  //               />
  //             </div>
  //             <Button variant="contained" color="primary" onClick={handleAddNewFlight}>
  //               Add New Flight
  //             </Button>
  //           </form>
  //         </div>
  //       )}
  // {selectedFlight && (
  //         <div>
  //           <h2>Modify Flight</h2>
  //           <form>
  //             <div>
  //               <TextField
  //                 label="Airline"
  //                 type="text"
  //                 name="airline"
  //                 value={selectedFlight.details.airline}
  //                 onChange={handleInputChange}
  //                 placeholder="Enter airline"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Departing Time"
  //                 type="text"
  //                 name="departingTime"
  //                 value={selectedFlight.details.departingTime}
  //                 onChange={handleInputChange}
  //                 placeholder="Enter departing time"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Arriving Time"
  //                 type="text"
  //                 name="arrivingTime"
  //                 value={selectedFlight.details.arrivingTime}
  //                 onChange={handleInputChange}
  //                 placeholder="Enter arriving time"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Departure Location"
  //                 type="text"
  //                 name="departureLocation"
  //                 value={selectedFlight.details.departureLocation}
  //                 onChange={handleInputChange}
  //                 placeholder="Enter departure location"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Arrival Location"
  //                 type="text"
  //                 name="arrivalLocation"
  //                 value={selectedFlight.details.arrivalLocation}
  //                 onChange={handleInputChange}
  //                 placeholder="Enter arrival location"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Price"
  //                 type="text"
  //                 name="price"
  //                 value={selectedFlight.details.price}
  //                 onChange={handleInputChange}
  //                 placeholder="Enter price"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Crew"
  //                 type="text"
  //                 name="crew"
  //                 value={selectedFlight.details.crew}
  //                 onChange={handleInputChange}
  //                 placeholder="Enter crew"
  //               />
  //             </div>
  //             <div>
  //               <TextField
  //                 label="Aircraft"
  //                 type="text"
  //                 name="aircraft"
  //                 value={selectedFlight.details.aircraft}
  //                 onChange={handleInputChange}
  //                 placeholder="Enter aircraft"
  //               />
  //             </div>
  //             <Button variant="contained" color="primary" onClick={handleSaveChanges}>
  //               Save Changes
  //             </Button>
  //           </form>
  //         </div>
  //       )}
  //     </div>
  //   );
};

export default SystemAdmin;
