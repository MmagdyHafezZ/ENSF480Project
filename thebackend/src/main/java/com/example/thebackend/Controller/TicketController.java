package com.example.thebackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.thebackend.Service.TicketService;
import com.example.thebackend.Entity.FlightsDetails;

@RestController
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/generateAndSendTicket")
    public String generateAndSendTicket(@RequestBody TicketRequest request) {
        try {
            ticketService.generateAndSendTicket(request.getUserEmail(), request.getFlightDetails(), request.getBalancePaid(), request.getCurrentbalance());
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
        private int balancePaid;
        private int currentbalance;


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
        public int getBalancePaid() {
            return balancePaid;
        }
        public void setBalancePaid(int balancePaid) {
            this.balancePaid = balancePaid;
        }
        public int getCurrentbalance() {
            return currentbalance;
        }
        public void setCurrentbalance(int currentbalance) {
            this.currentbalance = currentbalance;
        }
    }
}
