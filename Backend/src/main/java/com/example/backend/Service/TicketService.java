package com.example.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.Entity.FlightsDetails;
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

    public void generateAndSendTicket(String userEmail, FlightsDetails flightDetails) {
        try {
            String uniqueIdentifier = UUID.randomUUID().toString();
            String baseUrl = "http://localhost:5173/ticket-QR";
            String queryParams = String.format(
                "?departure=%s&arrival=%s&flightTime=%s&id=%s",
                URLEncoder.encode(flightDetails.getDeparture(), StandardCharsets.UTF_8.toString()),
                URLEncoder.encode(flightDetails.getArrival(), StandardCharsets.UTF_8.toString()),
                URLEncoder.encode(flightDetails.getFlightTime(), StandardCharsets.UTF_8.toString()),
                URLEncoder.encode(uniqueIdentifier, StandardCharsets.UTF_8.toString())
            );  

            // Combine base URL, unique identifier, and query parameters
            String encodedUrl = baseUrl + "/" + queryParams;

            // Generate QR Code for the encoded URL
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(encodedUrl, BarcodeFormat.QR_CODE, 200, 200);

            // Write QR code to ByteArrayOutputStream
            ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);

            // Convert QR code to byte array
            byte[] pngData = pngOutputStream.toByteArray();

            // Send email with QR code as an attachment
            emailService.sendEmailWithAttachment(userEmail, "Your E-Ticket", "Scan the QR code to view your flight details.", pngData, "ticket.png");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}



