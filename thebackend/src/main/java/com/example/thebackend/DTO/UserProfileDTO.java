package com.example.thebackend.DTO;
import java.util.*;

public class UserProfileDTO {
    private Long id;
    private String username;
    private String userRole;
    private String membershipType;
    private Integer loyaltyPoints;
    private List<String> recentBookings;
    private List<String> upcomingFlights;
    private Boolean emailNotification;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    public String getMembershipType() { return membershipType; }
    public void setMembershipType(String membershipType) { this.membershipType = membershipType; }
    public Integer getLoyaltyPoints() { return loyaltyPoints; }
    public void setLoyaltyPoints(Integer loyaltyPoints) { this.loyaltyPoints = loyaltyPoints; }
    public List<String> getRecentBookings() { return recentBookings; }
    public void setRecentBookings(List<String> recentBookings) { this.recentBookings = recentBookings; }
    public List<String> getUpcomingFlights() { return upcomingFlights; }
    public void setUpcomingFlights(List<String> upcomingFlights) { this.upcomingFlights = upcomingFlights; }
    public Boolean getEmailNotification() { return emailNotification; }
    public void setEmailNotification(Boolean emailNotification) { this.emailNotification = emailNotification; }
    

}