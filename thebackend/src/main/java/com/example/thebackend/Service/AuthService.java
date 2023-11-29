package com.example.thebackend.Service;


import com.example.thebackend.Entity.User;
import com.example.thebackend.Repository.UserRepository;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.stereotype.Service;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class AuthService {

    private static AuthService instance;
    private UserRepository userRepository;

    private AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static synchronized AuthService getInstance(UserRepository userRepository) {
        if (instance == null) {
            instance = new AuthService(userRepository);
        }
        return instance;
    }

    public void signup(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("User already exists with email: " + email);
        }

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(password); // In real applications, consider encrypting the password
        userRepository.save(newUser);
    }
    public boolean login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return true; // Login successful
        }
        return false; // Login failed
    }
    public boolean googleLogin(String googleToken) throws IllegalArgumentException {
        try {
            System.out.println("Google Token: " + googleToken); // Log the token
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                    .setAudience(Collections.singletonList("561701800707-oiljspvu920o0pfkavpfiedsu7sbrfgj.apps.googleusercontent.com"))
                    .build();
    
            GoogleIdToken idToken = verifier.verify(googleToken);
            if (idToken != null) {
                Payload payload = idToken.getPayload();
    
                String email = payload.getEmail();
                System.out.println("Extracted email: " + email); // Print the extracted email
                User user = userRepository.findByEmail(email);
                if (user == null) {
                    user = new User();
                    user.setEmail(email);
                    userRepository.save(user);
                }
                return true; // Google login successful
            } else {
                System.out.println("Invalid ID token.");
                return false;
            }
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return false;
        } catch (Exception e) {
            e.printStackTrace(); // Catch any other exceptions
            return false;
        }
        
    }
    
}
