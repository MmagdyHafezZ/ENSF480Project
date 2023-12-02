package com.example.thebackend.Service;

import java.time.LocalDateTime; 
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.thebackend.Entity.FlightsDetails;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

import java.io.ByteArrayOutputStream;

@Service
public class TicketService {

    @Autowired
    private EmailService emailService;

    public void generateAndSendTicket(String userEmail, FlightsDetails flightDetails, Integer balancePaid, Integer currentbalance) {
        try {
            String uniqueIdentifier = UUID.randomUUID().toString();
            String baseUrl = "http://localhost:5173/ticket-QR";

            // Check for null values in flightDetails and handle accordingly
            String departure = flightDetails != null && flightDetails.getDeparture() != null ? 
                               URLEncoder.encode(flightDetails.getDeparture(), StandardCharsets.UTF_8.toString()) : "N/A";
            String arrival = flightDetails != null && flightDetails.getArrival() != null ? 
                             URLEncoder.encode(flightDetails.getArrival(), StandardCharsets.UTF_8.toString()) : "N/A";
            String flightTime = flightDetails != null && flightDetails.getFlightTime() != null ? 
                                URLEncoder.encode(flightDetails.getFlightTime(), StandardCharsets.UTF_8.toString()) : "N/A";

            String queryParams = String.format(
                "?departure=%s&arrival=%s&flightTime=%s&id=%s", departure, arrival, flightTime, 
                URLEncoder.encode(uniqueIdentifier, StandardCharsets.UTF_8.toString())
                );  

            String encodedUrl = baseUrl + "/" + queryParams;

            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(encodedUrl, BarcodeFormat.QR_CODE, 200, 200);

            ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
            byte[] pngData = pngOutputStream.toByteArray();

            // Handling null values for balancePaid and currentbalance
            String balancePaidStr = balancePaid != null ? String.valueOf(balancePaid) : "N/A";
            String currentbalanceStr = currentbalance != null ? String.valueOf(currentbalance) : "N/A";

            emailService.sendEmailWithAttachment(
                userEmail, 
                "Your E-Ticket", 
                "-Scan the QR code to view your flight details- \n departure: " + departure + 
                "\n arrival: " + arrival + 
                "\n flightTime: " + flightTime + 
                "\n balancePaid: " + balancePaidStr + 
                "\n currentbalance: " + currentbalanceStr + "\n", 
                pngData, 
                "ticket.png"
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendCancellationEmail(String userEmail, FlightsDetails flightDetails, Integer balancePaid){
        try{
            String departure = flightDetails != null && flightDetails.getDeparture() != null ? 
                               URLEncoder.encode(flightDetails.getDeparture(), StandardCharsets.UTF_8.toString()) : "N/A";
            String arrival = flightDetails != null && flightDetails.getArrival() != null ? 
                             URLEncoder.encode(flightDetails.getArrival(), StandardCharsets.UTF_8.toString()) : "N/A";

            String formattedFlightDate = "";

            if(flightDetails != null && flightDetails.getFlightTime() != null){
                LocalDateTime flightDate = LocalDateTime.parse(flightDetails.getFlightTime(), DateTimeFormatter.ISO_DATE_TIME);
                formattedFlightDate = flightDate.format(DateTimeFormatter.ofPattern("MMMM d, yyyy")); 
            } else {
                formattedFlightDate = "N/A";
            }

            if (departure.contains("+")) {
                departure = departure.replace("+", " ");
            }

            if (arrival.contains("+")) {
                arrival = arrival.replace("+", " ");
            }
            
            String balancePaidStr = balancePaid != null ? String.valueOf(balancePaid) : "N/A";

            String emailSubject = "Cancellation Confirmation";

            String emailBody = String.format("Your flight departing from %s and arriving to %s on %s has been successfully cancelled.\r\n\r\nYou will be refunded with a balance of: $%s\r\n\r\nHave a great day!", departure, arrival, formattedFlightDate, balancePaidStr);

            emailService.sendEmailWithoutAttachment(userEmail, emailSubject, emailBody);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
