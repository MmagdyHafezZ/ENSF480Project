package com.example.thebackend.Entity;
import jakarta.persistence.*;

@Entity
public class UserCreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Other fields and getters/setters
}

