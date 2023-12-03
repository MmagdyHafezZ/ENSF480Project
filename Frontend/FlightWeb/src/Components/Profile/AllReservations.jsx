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

  const handleOpenCancelDialog = (event, reservation) => {
    event.stopPropagation();
    setSelectedReservation(reservation);
    setOpenCancelDialog(true);
    console.log(selectedReservation)
  }

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  }

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getBooking/${userid}`
      );

      // Check if response.data is an array or a single object and set it appropriately
      if (Array.isArray(response.data)) {
        setReservations(response.data);
      } else if (response.data && typeof response.data === "object") {
        setReservations([response.data]);
      } else {
        setReservations([]);
      }
    } catch (error) {

      console.error("Error fetching reservations:", error);

      setReservations([]);

    }
  };

  const handleCancelReservation = async () => {
    try {
      // Replace with your API endpoint
      await axios.delete(
        `http://localhost:8080/api/reservations/${reservationId}`
      );
      // Refresh the reservations list
      fetchReservations();
    } catch (error) {

      const updatedReservations = reservations.filter(reservation => reservation.id !== selectedReservation.id);
      setReservations(updatedReservations);
      handleConfirmationEmail();
      handleCloseCancelDialog();
      // Send Cancellation email


      // console.error("Error cancelling reservation:", error);
    }
  };

  const handleConfirmationEmail = async () => {
    try{
      const emailObj = {
        userEmail: "",
        flightDetails: {
          departure: "New York",
          arrival: "London",
          flightTime: "2023-11-29T10:00:00"
        }
      };
      await
        axios
          .post("http://localhost:8080/sendCancellationEmail", emailObj);
      setOpenSuccessDialog(true);
    } catch (error) {
      console.error("Error updating booking: ", error);
    }
  }

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
                <TableCell>Passenger</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Seat</TableCell>
                <TableCell>Meal</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((row, index) => (
                <TableRow key={row.id || index}>
                  <TableCell component="th" scope="row">
                    {row.passenger}
                  </TableCell>
                  <TableCell>{row.origin}</TableCell>
                  <TableCell>{row.destination}</TableCell>
                  <TableCell>{row.seat}</TableCell>
                  <TableCell>{row.meal}</TableCell>
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

        {selectedReservation && (
          <Dialog
            open={openCancelDialog}
            onClose={handleCloseCancelDialog}
          >
            <DialogTitle>
              Cancel Reservation
            </DialogTitle>
            <DialogContent>
              <Typography>
              Are you sure you want to cancel the reservation for{" "}{selectedReservation.flight}?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCancelDialog}>
                No
              </Button>
              <Button onClick={() => handleCancelReservation(selectedReservation.id)}>
                Yes
              </Button>
            </DialogActions>

          </Dialog>
        )}

        {selectedReservation && (
          <Dialog
            open={openSuccessDialog}
            onClose={handleCloseSuccessDialog}
          >
            <DialogTitle>
              Cancellation Successful
            </DialogTitle>
            <DialogContent>
              <Typography>
                Cancellation email sent
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseSuccessDialog}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        )}

      </Container>
    </>
  );
};

export default AllReservations;
