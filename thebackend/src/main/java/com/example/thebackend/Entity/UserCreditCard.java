package com.example.thebackend.Entity;
import jakarta.persistence.*;

@Entity
@Table(name = "userCreditCard")
public class UserCreditCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cardNumber;
    private String expiryDate;
    private String cvv;
    private String cardholderName;
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    // Constructors, Getters and Setters
    public UserCreditCard(String cardNumber, String expiryDate, String cvv, String cardholderName, String address) {
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.cardholderName = cardholderName;
        this.address = address;

    }
    public UserCreditCard() {
    }
    public String getCardNumber() {
        return cardNumber;
    }
    public String getExpiryDate() {
        return expiryDate;
    }
    public String getCvv() {
        return cvv;
    }
    public String getCardholderName() {
        return cardholderName;
    }
    public String getAddress() {
        return address;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }
    public void setCvv(String cvv) {
        this.cvv = cvv;
    }
    public void setCardholderName(String cardholderName) {
        this.cardholderName = cardholderName;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public void deleteById(Long id2) {

    }
    public void setId(Long id2) {
        this.id = id2;
    }
    public Long getId() {
        return id;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public User getUser() {
        return user;
    }
    
    
}

