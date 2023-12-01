package com.example.thebackend.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * FlightListEntity
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "flightlist")
public class FlightListEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "searchbookingid", referencedColumnName = "id")
    private SearchBookingEntity searchBooking;

    // @ManyToOne(targetEntity = SearchBookingEntity.class, cascade = CascadeType.ALL)
    // @JoinColumn(name = "aircraft_id", referencedColumnName = "id")
    // private AircraftEntity aircraft;


}