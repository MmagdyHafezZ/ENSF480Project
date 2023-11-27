package com.example.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AirportEntity
 */
@Entity
@Data
@Table(name = "AirportData")
@NoArgsConstructor
@AllArgsConstructor
public class AirportEntity {

    // @Id
    @Column(name = "iata")
    // @GeneratedValue
    private String iata;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;
}