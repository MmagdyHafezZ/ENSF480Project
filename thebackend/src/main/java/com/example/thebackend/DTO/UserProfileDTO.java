package com.example.thebackend.DTO;
import java.util.*;

import com.example.thebackend.Entity.Memberships;

public class UserProfileDTO {
    private Long id;
    private String username;
    private String userRole;
    private Memberships membershipType;
    private Integer loyaltyPoints;
    private List<String> recentBookings;
    private List<String> upcomingFlights;
    private Boolean emailNotification;
    private Integer balance;
    private String email;
    private String phoneNumber;

    // Getters and Setters
    public Integer getBalance() { return balance; }
    public void setBalance(Integer balance) { this.balance = balance; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    public Memberships getMembershipType() { return membershipType; }
    public void setMembershipType(Memberships membershipType) { this.membershipType = membershipType; }
    public Integer getLoyaltyPoints() { return loyaltyPoints; }
    public void setLoyaltyPoints(Integer loyaltyPoints) { this.loyaltyPoints = loyaltyPoints; }
    public List<String> getRecentBookings() { return recentBookings; }
    public void setRecentBookings(List<String> recentBookings) { this.recentBookings = recentBookings; }
    public List<String> getUpcomingFlights() { return upcomingFlights; }
    public void setUpcomingFlights(List<String> upcomingFlights) { this.upcomingFlights = upcomingFlights; }
    public Boolean getEmailNotification() { return emailNotification; }
    public void setEmailNotification(Boolean emailNotification) { this.emailNotification = emailNotification; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    

}