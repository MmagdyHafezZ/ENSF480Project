package com.example.thebackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.Service.TicketService;
import com.example.backend.Entity.FlightsDetails;

@RestController
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/generateAndSendTicket")
    public String generateAndSendTicket(@RequestBody TicketRequest request) {
        try {
            ticketService.generateAndSendTicket(request.getUserEmail(), request.getFlightDetails());
            return "E-ticket sent successfully to " + request.getUserEmail();
        } catch (Exception e) {
            // Handle exceptions (e.g., email service failure)
            return "Failed to send e-ticket: " + e.getMessage();
        }
    }

    // Inner class to represent the request body
    public static class TicketRequest {
        private String userEmail;
        private FlightsDetails flightDetails;

        // Getters and setters for userEmail and flightDetails
        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }

        public FlightsDetails getFlightDetails() {
            return flightDetails;
        }

        public void setFlightDetails(FlightsDetails flightDetails) {
            this.flightDetails = flightDetails;
        }
    }
}
