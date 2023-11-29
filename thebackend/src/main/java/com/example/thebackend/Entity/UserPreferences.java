package com.example.thebackend.Entity;
import jakarta.persistence.*;


@Entity
public class UserPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Other fields and getters/setters
}
