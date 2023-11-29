package com.example.thebackend.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "user_profile")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String userRole;
    private String membershipType;
    private Integer loyaltyPoints;

    @ElementCollection
    private List<String> recentBookings;

    @ElementCollection
    private List<String> upcomingFlights;
    
    private Boolean emailNotification;

    // Constructors, Getters and Setters
}

