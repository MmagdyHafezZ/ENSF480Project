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
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const userid = useState(localStorage.getItem("id"))[0];

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

  const handleCancelReservation = async (reservationId) => {
    try {
      // Replace with your API endpoint
      await axios.delete(
        `http://localhost:8080/api/reservations/${reservationId}`
      );
      // Refresh the reservations list
      fetchReservations();
    } catch (error) {
      console.error("Error canceling reservation:", error);
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
                      onClick={() => handleCancelReservation(row.id)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default AllReservations;
