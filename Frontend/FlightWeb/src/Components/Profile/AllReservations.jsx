// src/components/AllReservations.js
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
} from "@mui/material";
import Navbar from "../Navbar/Navbar";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservations data from API and set it to state
    // For demonstration, using dummy data
    setReservations([
      { id: 1, flight: "New York to London", date: "2023-01-15" },
      { id: 2, flight: "Paris to Tokyo", date: "2023-02-20" },
      // ... more reservations ...
    ]);
  }, []);

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
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.flight}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
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
