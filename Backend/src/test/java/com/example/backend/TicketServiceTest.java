package com.example.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.backend.Entity.FlightsDetails;
import com.example.backend.Service.TicketService;

import jakarta.mail.internet.MimeMessage;
import jakarta.mail.Session;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class TicketServiceTest {

    @Autowired
    private TicketService ticketService;

    @MockBean
    private JavaMailSender mailSender;

    @BeforeEach
    public void setup() {
        // Ensure createMimeMessage() returns a non-null MimeMessage
        when(mailSender.createMimeMessage()).thenReturn(new MimeMessage((Session) null));
    }

    @Test
    public void testGenerateAndSendTicket() {
        FlightsDetails flightDetails = new FlightsDetails();
        flightDetails.setDeparture("New York");
        flightDetails.setArrival("London");
        flightDetails.setFlightTime("2023-11-29T10:00:00");

        ticketService.generateAndSendTicket("magdy.hafez.mous9123@gmail.com", flightDetails);

        // Verify that an email send attempt was made
        verify(mailSender, times(1)).send(any(MimeMessage.class));
    }

}
