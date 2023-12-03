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
import axios from "axios"; // Make sure to install axios if not already installed

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      // Replace with your API endpoint
      const response = await axios.get(
        "http://localhost:8080/api/reservations"
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([
        { id: 1, flight: "New York to London", date: "2023-01-15" },
        { id: 2, flight: "Paris to Tokyo", date: "2023-02-20" },
      ]);
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
                <TableCell>Flight</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.flight}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
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
