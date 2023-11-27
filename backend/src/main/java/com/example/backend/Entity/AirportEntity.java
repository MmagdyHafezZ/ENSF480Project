package com.example.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AirportData
 */
@Entity
@Data
@Table(name = "AirportData")
@NoArgsConstructor
@AllArgsConstructor
public class AirportEntity {

    @Id
    @Column(name = "Code")
    @GeneratedValue
    private String iata;

    @Column(name = "City")
    private String city;

    @Column(name = "State")
    private String state;

    @Column(name = "Country")
    private String country;
}