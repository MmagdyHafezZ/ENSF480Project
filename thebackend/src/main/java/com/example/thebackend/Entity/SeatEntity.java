package com.example.thebackend.Entity;


import jakarta.persistence.*;
@Entity
@Table(name = "list_of_seats")
public class SeatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // or another appropriate type like Integer

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flights flight;

    @Column(name = "SeatType")
    private String seatType; // e.g., "ordinary", "comfort", "business"

    @Column(name = "SeatID")
    private String seatID; // e.g., "A1", "B5", "C1"... 'A', 'B', 'C'

    @Column(name = "SeatAvailability")
    private boolean isAvailable;

    // Getters and Setters  
    // id
    public Long getId() { return id; }
    public void setId(Long string) { this.id = string; }

    // flight
    public Flights getFlight() { return flight; }
    public void setFlight(Flights flight) { this.flight = flight; }

    // seatType
    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }

    // isAvailable
    public boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(boolean isAvailable) { this.isAvailable = isAvailable; }

    // seatID
    public String getSeatID() { return seatID; }
    public void setSeatID(String seatID) { this.seatID = seatID; }
    

}
