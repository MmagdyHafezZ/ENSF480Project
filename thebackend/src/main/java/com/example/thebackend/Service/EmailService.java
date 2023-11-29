package com.example.thebackend.Service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.ByteArrayResource;



@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendEmailWithAttachment(String to, String subject, String text, byte[] attachment, String filename) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("Magdy.hafez9123@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);

        // Add the QR code as an attachment
        helper.addAttachment(filename, new ByteArrayResource(attachment));

        emailSender.send(message);
        System.out.println("Email with attachment sent to " + to + " with subject " + subject);
    }
}
