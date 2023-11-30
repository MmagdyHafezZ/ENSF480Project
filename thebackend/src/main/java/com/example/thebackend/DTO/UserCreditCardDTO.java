package com.example.thebackend.DTO;

import com.example.thebackend.Entity.UserProfile;

public class UserCreditCardDTO {
    private Long id;
    private String cardNumber;
    private String expiryDate;
    private String cvv;
    private String cardholderName;
    private String address;
    private UserProfile userProfile;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }
    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
    public String getCvv() { return cvv; }
    public void setCvv(String cvv) { this.cvv = cvv; }
    public String getCardholderName() { return cardholderName; }
    public void setCardholderName(String cardholderName) { this.cardholderName = cardholderName; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public UserProfile getUserProfile() {
        return userProfile;

    }

    
}
