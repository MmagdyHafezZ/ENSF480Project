import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const flightDetails = JSON.parse(localStorage.getItem("flightDetails")) || {};
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  const isSignIn = localStorage.getItem("isSignIn") === "true";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username") || "";
  const email = localStorage.getItem("email") || "";
  const id = parseInt(localStorage.getItem("id"));
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    fetchReservations();
    console.log("id", id);
    console.log("flightDetails", flightDetails);
    const storedSeats = JSON.parse(
      localStorage.getItem("selectedSeats") || "{}"
    );
    const seats = Object.keys(storedSeats).filter((seat) => storedSeats[seat]);
    setSelectedSeats(seats);
    setSelectedSeats(seats);
  }, []);

  const fetchReservations = async () => {
    try {
      const userid = parseInt(localStorage.getItem("id"));
      const response = await axios.get(
        `http://localhost:8080/api/user/getUpcomingFlights/${userid}`
      );

      const res2 = await axios.get(
        `http://localhost:8080/getFlight/${response.data}`
      );

      const flight = {
        id: res2.data.id,
        origin: res2.data.iata1,
        destination: res2.data.iata2,
        departureDay: res2.data.departureDay,
        arrivalDay: res2.data.arrivalDay,
        departureTime: res2.data.departureTime,
        arrivalTime: res2.data.arrivalTime,
        ordinaryPrice: res2.data.ordinaryPrice,
        businessPrice: res2.data.businessPrice,
        comfortPrice: res2.data.comfortPrice,
        planeType: res2.data.planeType,
      };

      setReservations([flight]); // Wrap the flight object in an array
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]); // Make sure to reset to an empty array in case of an error
    }
  };

  const handleOpenCancelDialog = (event, reservation) => {
    event.stopPropagation();
    setSelectedReservation(reservation);
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  const handleCancelReservation = async () => {
    try {
      fetchReservations();
      handleConfirmationEmail();
      handleCloseCancelDialog();
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const handleConfirmationEmail = async () => {
    // Implement email sending logic here
    try {
      const emailObj = {
        userEmail: email,
        flightDetails: {
          departure: flightDetails.iata1,
          arrival: flightDetails.iata2,
          flightTime: flightDetails.departureTime,
        },
      };
      await axios.post("http://localhost:8080/sendCancellationEmail", emailObj);
      await axios.delete(
        `http://localhost:8080/api/user/deleteUpcomingFlight/${id}/${flightDetails.id}`
      );

      setOpenSuccessDialog(true);
    } catch (error) {
      console.error("Error updating booking: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: "150px" }}>
        <Typography variant="h4" style={{ margin: "20px 0" }}>
          Your Reservations
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Departure Time</TableCell>
                <TableCell>Arrival Time</TableCell>
                <TableCell>Plane Type</TableCell>
                <TableCell>Seats</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.origin}</TableCell>
                  <TableCell>{row.destination}</TableCell>
                  <TableCell>{`${row.departureDay} at ${row.departureTime}`}</TableCell>
                  <TableCell>{`${row.arrivalDay} at ${row.arrivalTime}`}</TableCell>
                  <TableCell>{row.planeType}</TableCell>
                  {selectedSeats.length > 0 && (
                    <TableCell>{selectedSeats.join(", ")}</TableCell>
                  )}
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(event) => handleOpenCancelDialog(event, row)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
          <DialogTitle>Cancel Reservation</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to cancel the reservation for{" "}
              {selectedReservation && selectedReservation.destination}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCancelDialog}>No</Button>
            <Button
              onClick={() => handleCancelReservation(selectedReservation.id)}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
          <DialogTitle>Cancellation Successful</DialogTitle>
          <DialogContent>
            <Typography>Cancellation email sent</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSuccessDialog}>OK</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AllReservations;
