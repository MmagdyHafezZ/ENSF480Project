import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Container } from "@mui/material";

const TicketInfo = () => {
  const location = useLocation();

  // Function to parse query parameters and extract data
  const parseURL = () => {
    const searchParams = new URLSearchParams(location.search);
    const departure = searchParams.get("departure");
    const arrival = searchParams.get("arrival");
    const flightTime = searchParams.get("flightTime");
    const id = searchParams.get("id");
    return { departure, arrival, flightTime, id };
  };

  const { departure, arrival, flightTime, id } = parseURL();

  return (
    <Container>
      <Card raised>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            E-Ticket Information
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <strong>Departure:</strong> {departure}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <strong>Arrival:</strong> {arrival}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <strong>Flight ID:</strong> {id}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <strong>Flight Time:</strong> {flightTime}
          </Typography>

          {/* Add more fields as necessary */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TicketInfo;
