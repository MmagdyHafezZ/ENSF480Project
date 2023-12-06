package com.example.thebackend.Service;


import com.example.thebackend.Entity.Memberships;
import com.example.thebackend.Entity.User;
import com.example.thebackend.Entity.UserCreditCard;
import com.example.thebackend.Entity.UserPreferences;
import com.example.thebackend.Entity.UserProfile;
import com.example.thebackend.Repository.UserRepository;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class AuthService {

    @Autowired
    private PromoService promoService;

    private static AuthService instance;

    @Autowired
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

    public Long signup(String email, String password, String firstName, String lastName, Memberships membershipType) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("User already exists with email: " + email);
        }

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(password); // In real applications, consider encrypting the password
        newUser.setfirst_name(firstName);
        newUser.setlast_name(lastName);
        newUser.setmembershipType(membershipType);
        userRepository.save(newUser);
         UserProfile userProfile = new UserProfile();
        userProfile.setUser(newUser);
        newUser.setUserProfile(userProfile);
        // set other userProfile fields

        UserCreditCard creditCard = new UserCreditCard();
        creditCard.setUser(newUser);
        // set other creditCard fields

        UserPreferences preferences = new UserPreferences();
        preferences.setUser(newUser);
        userRepository.save(newUser);
        // set other preferences fields

        promoService.postPromo(newUser.getId());
        return newUser.getId();

    }
    public Long login(String email, String password) {
        User user = userRepository.findByEmail(email);
        System.out.println("user: " + user);
        System.out.println("password: " + password);
        System.out.println("user.getPassword(): " + user.getPassword());
        if (user != null && user.getPassword().equals(password)) {
            return user.getId(); // Login successful
        }
        return null; // Login failed
    }
    public Long googleLogin(String googleToken) throws IllegalArgumentException {
        try {
            System.out.println("in");
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                    .setAudience(Collections.singletonList("561701800707-oiljspvu920o0pfkavpfiedsu7sbrfgj.apps.googleusercontent.com"))
                    .build();
    
            GoogleIdToken idToken = verifier.verify(googleToken);
            if (googleToken == null || googleToken.trim().isEmpty()) {
                System.out.println("Token is null or empty");
                return null;
            }
            
            System.out.println("verifier: " + verifier);
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
                return user.getId();
            } else {
                System.out.println("Invalid ID token.");
                return null;
            }
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            e.printStackTrace(); // Catch any other exceptions
            return null;
        }
        
    }
    
}
