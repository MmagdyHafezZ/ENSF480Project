package com.example.thebackend.Entity;

import jakarta.persistence.*;
import java.util.List;
@Entity
@Table(name = "userprofile")
public class UserProfile {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private String username;

    private String userRole;

    @Enumerated(EnumType.STRING)
    private MembershipType membershipType;

    private Integer loyaltyPoints;

    @ElementCollection
    private List<String> recentBookings;

    @ElementCollection
    private List<String> upcomingFlights;

    private Boolean emailNotification;


    // Constructors, Getters and Setters
    public UserProfile( String username, String userRole, MembershipType membershipType, Integer loyaltyPoints, List<String> recentBookings, List<String> upcomingFlights, Boolean emailNotification, User user) {
        this.username = username;
        this.userRole = userRole;
        this.membershipType = membershipType;
        this.loyaltyPoints = loyaltyPoints;
        this.recentBookings = recentBookings;
        this.upcomingFlights = upcomingFlights;
        this.emailNotification = emailNotification;
        this.user = user;
    }

    
    public UserProfile() {
    }
    public String getUsername() {
        return username;
    }
    public String getUserRole() {
        return userRole;
    }
    public MembershipType getMembershipType() {
        return membershipType;
    }
    public Integer getLoyaltyPoints() {
        return loyaltyPoints;
    }
    public List<String> getRecentBookings() {
        return recentBookings;
    }
    public List<String> getUpcomingFlights() {
        return upcomingFlights;
    }
    public Boolean getEmailNotification() {
        return emailNotification;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
    public void setMembershipType(MembershipType membershipType) {
        this.membershipType = membershipType;
    }
    public void setLoyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }
    public void setRecentBookings(List<String> recentBookings) {
        this.recentBookings = recentBookings;
    }
    public void setUpcomingFlights(List<String> upcomingFlights) {
        this.upcomingFlights = upcomingFlights;
    }
    public void setEmailNotification(Boolean emailNotification) {
        this.emailNotification = emailNotification;
    }
    public void setId(Long id) {
        this.id = id;
    }
    @Override
    public String toString() {
        return "UserProfile{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", userRole='" + userRole + '\'' +
                ", membershipType='" + membershipType + '\'' +
                ", loyaltyPoints=" + loyaltyPoints +
                ", recentBookings=" + recentBookings +
                ", upcomingFlights=" + upcomingFlights +
                ", emailNotification=" + emailNotification +
                '}';
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Long getId() {
        return id;
    }
    public User getUser() {
        return user;
    }

}
