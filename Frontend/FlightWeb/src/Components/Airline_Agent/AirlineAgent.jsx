// src/components/AirlineAgentPage.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Pagination,
} from "@mui/material";
import axios from "axios";

const AirlineAgentPage = () => {
  // const [bookings, setBookings] = useState([
  //   // Dummy data for demonstration
  //   {
  //     id: 1,
  //     passengerName: "John Doe",
  //     flight: "NY to LA",
  //     status: "Confirmed",
  //     details: "Seat 21A, No meal preference",
  //   },
  //   {
  //     id: 2,
  //     passengerName: "Jane Smith",
  //     flight: "Berlin to Paris",
  //     status: "Confirmed",
  //     details: "Seat 14C, Vegetarian",
  //   },
  //   // Add more bookings here
  // ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [agent, setAgent] = useState(localStorage.getItem("agent") || false);
  const [getBookings, setGetBookings] = useState([]);
  const [putPassenger, setPutPassenger] = useState("");
  const [putFlight, setPutFlight] = useState("");
  const [putConfirm, setPutConfirm] = useState("");
  const [putSeat, setPutSeat] = useState("");
  const [putMeal, setPutMeal] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/getBooking")
      .then((response) => {
        setGetBookings(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
  }, []);

  useEffect(() => {
    if (agent == false) {
      window.location.href = "/signin-agent";
    }
  }, []);

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  const handleOpenDialog = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };
  const handleOpenEditDialog = (event, booking) => {
    event.stopPropagation(); // Prevent event from propagating to the table row
    setSelectedBooking(booking);
    setPutPassenger(booking.passenger);
    setPutFlight(booking.flight);
    setPutConfirm(booking.confirm);
    setPutSeat(booking.seat);
    setPutMeal(booking.meal);
    setOpenEditDialog(true);
  };

  const handleOpenCancelDialog = (event, booking) => {
    event.stopPropagation(); // Prevent event from propagating to the table row
    setSelectedBooking(booking);
    setOpenCancelDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePassengerEdit = (event) => {
    setPutPassenger(event.target.value);
  }

  const handleFlightEdit = (event) => {
    setPutFlight(event.target.value);
  }

  const handleConfirmEdit = (event) => {
    setPutConfirm(event.target.value);
  }

  const handleSeatEdit = (event) => {
    setPutSeat(event.target.value);
  }

  const handleMealEdit = (event) => {
    setPutMeal(event.target.value);
  }

  const handlePutMethod = async() => {
    const updatedBookingData = {
      ...selectedBooking,
      passenger : putPassenger,
      flight : putFlight,
      confirm : putConfirm,
      seat : putSeat,
      meal : putMeal
    }
    try{
      const response = await 
        axios
          .put(`http://localhost:8080/putBooking/${selectedBooking.id}`, updatedBookingData);
      if(response.status === 200) {
        const updatedBookings = getBookings.map((booking) =>
        booking.id === selectedBooking.id ? { ...booking, ...updatedBookingData } : booking
      );
        setGetBookings(updatedBookings);
        setOpenEditDialog(false);
      } else {
        console.log("Error updating booking: ", response.data)
      }
    } catch (error) {
      console.error("Error updating booking: ", error);
    }
  }

  // const filteredBookings = getBookings.filter((booking) =>
  //   booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  const saveData = async () => {
    // Gather data from form fields
    const data = {};

    // Send POST request to server
    try {
      const response = await fetch("/api/airlineAgent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Handle server response
      if (response.ok) {
        // Notify user of successful save
        console.log("Data saved successfully");
      } else {
        // Notify user of error
        console.log("Error saving data");
      }
    } catch (error) {
      // Notify user of error
      console.log("Error saving data", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        Manage Bookings
      </Typography>

      <TextField
        label="Search by Passenger Name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />

      <TableContainer component={Paper}>
        <Table aria-label="bookings table">
          <TableHead>
            <TableRow>
              <TableCell>Passenger Name</TableCell>
              <TableCell>Flight</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getBookings.filter((booking) =>
              booking.passenger.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((getBooking) => (
              <TableRow
                key={getBooking.id}
                onClick={() => handleOpenDialog(getBooking)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{getBooking.passenger}</TableCell>
                <TableCell>{getBooking.flight}</TableCell>
                <TableCell>{getBooking.confirm}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={(e) => handleOpenEditDialog(e, getBooking)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={(e) => handleOpenCancelDialog(e, getBooking)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow
                key={booking.id}
                onClick={() => handleOpenDialog(booking)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{booking.passengerName}</TableCell>
                <TableCell>{booking.flight}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={(e) => handleOpenEditDialog(e, booking)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={(e) => handleOpenCancelDialog(e, booking)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>

      <Box my={2}>
        <Pagination count={10} color="primary" />
      </Box>

      {/* Edit Booking Dialog */}
      {selectedBooking && (
        <Dialog 
          open={openEditDialog} 
          onClose={handleCloseEditDialog}
          sx={{ '& .MuiDialog-paper': { 
            minWidth: '300px',
            minHeight: '300px' } }}
        >
          <DialogTitle>Edit Booking</DialogTitle>
          <DialogContent>
            {/* Add field for editing PASSENGER */}
            <TextField
              label="Passenger Name"
              placeholder={putPassenger}  
              onChange={handlePassengerEdit}
              fullWidth
              sx={{mb : 1, mt : 1}}
            />
            
            {/* Add field for editing FLIGHT */}
            <TextField
              label="Flight"
              placeholder={putFlight}
              // value={putFlight}
              onChange={handleFlightEdit}
              fullWidth
              sx={{mb : 1, mt : 1}}
            />
            {/* Add field for editing CONFIRM */}
            <TextField
              label="Confirm"
              placeholder={putConfirm}
              onChange={handleConfirmEdit}
              fullWidth
              sx={{mb : 1, mt : 1}}
            />
            {/* Add field for editing SEAT */}
            <TextField
              label="Seat"
              placeholder={putSeat}
              onChange={handleSeatEdit}
              fullWidth
              sx={{mb : 1, mt : 1}}
            />
            {/* Add field for editing MEAL */}
            <TextField
              label="Meal"
              placeholder={putMeal}
              onChange={handleMealEdit}
              fullWidth
              sx={{mb : 1, mt : 1}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handlePutMethod}>Save</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Cancel Booking Dialog */}
      {selectedBooking && (
        <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to cancel the booking for{" "}
              {selectedBooking.passengerName}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCancelDialog}>No</Button>
            <Button
              onClick={() => {
                /* Implement save logic here */
                saveData();
              }}
              color="secondary"
            >
              Yes, Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Click to show more information */}
      {selectedBooking && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Passenger Name: {selectedBooking.passenger}
            </Typography>
            <Typography variant="body1" style={{paddingBottom: "2px"}}>
              Flight: {selectedBooking.flight}
            </Typography>
            <Typography variant="body1" style={{paddingBottom: "2px"}}>
              Status: {selectedBooking.confirm}
            </Typography>
            <Typography variant="body1" style={{paddingBottom: "2px"}}>
              Seat: {selectedBooking.seat}
            </Typography>
            <Typography variant="body1" style={{paddingBottom: "2px"}}>
              Meal: {selectedBooking.meal}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default AirlineAgentPage;
