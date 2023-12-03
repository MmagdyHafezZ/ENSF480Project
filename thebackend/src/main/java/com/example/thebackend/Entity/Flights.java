package com.example.thebackend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "listOfFlights")
public class Flights {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "iata1")
    private String iata1;

    @Column(name = "iata2")
    private String iata2;

    @Column(name = "ArrivalDay")
    private String arrivalDay;
    
    @Column(name = "DepartureDay")
    private String departureDay;
    

    @Column(name = "ArrivalTime")
    private String arrivalTime;

    @Column(name = "DepartureTime")
    private String departureTime;

    @Column(name = "OrdinaryPrice")
    private int ordinaryPrice;

    @Column(name = "BusinessPrice")
    private int businessPrice;

    @Column(name = "ComfortPrice")
    private int comfortPrice;

    @Column(name = "PlaneType")
    private Character planeType;

    // Getters and Setters
    // id
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // iata1
    public String getIata1() { return iata1; }
    public void setIata1(String iata1) { this.iata1 = iata1; }

    // iata2
    public String getIata2() { return iata2; }
    public void setIata2(String iata2) { this.iata2 = iata2; }

    // ArrivalDay
    public String getArrivalDay() { return arrivalDay; }
    public void setArrivalDay(String ArrivalDay) { this.arrivalDay = ArrivalDay; }

    // DepartureDay
    public String getDepartureDay() { return departureDay; }
    public void setDepartureDay(String DepartureDay) { this.departureDay = DepartureDay; }

    // ArrivalTime
    public String getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(String ArrivalTime) { this.arrivalTime = ArrivalTime; }

    // DepartureTime
    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String DepartureTime) { this.departureTime = DepartureTime; }

    // OrdinaryPrice
    public int getOrdinaryPrice() { return ordinaryPrice; }
    public void setOrdinaryPrice(int OrdinaryPrice) { this.ordinaryPrice = OrdinaryPrice; }

    // BusinessPrice
    public int getBusinessPrice() { return businessPrice; }
    public void setBusinessPrice(int BusinessPrice) { this.businessPrice = BusinessPrice; }

    // ComfortPrice
    public int getComfortPrice() { return comfortPrice; }
    public void setComfortPrice(int ComfortPrice) { this.comfortPrice = ComfortPrice; }
    public Character getPlaneType() {
        return planeType;
    }
    public void setPlaneType(Character planeType) {
        this.planeType = planeType;
    }
    

}
