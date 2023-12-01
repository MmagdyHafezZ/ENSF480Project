package com.example.thebackend.Entity;

import jakarta.persistence.*;
import java.util.List;

import com.example.thebackend.DTO.MembershipDTO;

@Entity
@Table(name = "userProfile")
public class UserProfile {

    @Id
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private String username;
    private String userRole;
    private Memberships membershipType;
    private Integer loyaltyPoints;
    private Integer balance;
    private String email;
    private String phoneNumber;


    @ElementCollection
    private List<String> recentBookings;

    @ElementCollection
    private List<String> upcomingFlights;
    
    private Boolean emailNotification;

    // Constructors, Getters and Setters
    public UserProfile( String username, String userRole, Memberships membershipType, Integer loyaltyPoints, List<String> recentBookings, List<String> upcomingFlights, Boolean emailNotification, User user, String email, String phoneNumber) {
        this.username = username;
        this.userRole = userRole;
        this.membershipType = membershipType;
        this.loyaltyPoints = loyaltyPoints;
        this.recentBookings = recentBookings;
        this.upcomingFlights = upcomingFlights;
        this.emailNotification = emailNotification;
        this.user = user;
        this.email = email;
        this.phoneNumber = phoneNumber;

    }
    public UserProfile() {
    }
    public String getEmail() {
        return email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setEmail(String email2) {
        this.email = email2;
    }
    public void setPhoneNumber(String phoneNumber2) {
        this.phoneNumber = phoneNumber2;
    }
    public String getUsername() {
        return username;
    }
    public String getUserRole() {
        return userRole;
    }
    public Memberships getMembershipType() {
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
    public void setMembershipType(Memberships memberships) {
        this.membershipType = memberships;
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
    public Object getbalance() {
        return balance;
    }
    public void setbalance(Integer balance) {
        this.balance = balance;
    }

}
