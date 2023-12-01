package com.example.thebackend.DTO;

import com.example.thebackend.Entity.Memberships;

public class SignupRequest {
    private String email;
    private String password;
    private String name; // and other relevant fields
    private String firstName;
    private String lastName;
    private Memberships membershipType;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public Memberships getMembershipType() {
        return membershipType;
    }
    public void setMembershipType(Memberships membershipType) {
        this.membershipType = membershipType;
    }

    
}
