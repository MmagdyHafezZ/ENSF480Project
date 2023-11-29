package com.example.thebackend.Entity;

public class FlightsDetails {
    private String flightNumber;
    private String departure;
    private String arrival;
    private String flightTime;
    private String price;

    public FlightsDetails(String flightNumber, String departure, String arrival, String flightTime, String price) {
        this.flightNumber = flightNumber;
        this.departure = departure;
        this.arrival = arrival;
        this.flightTime = flightTime;
        this.price = price;
    }

    public FlightsDetails() {
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public String getDeparture() {
        return departure;
    }

    public String getArrival() {
        return arrival;
    }

    public String getPrice() {
        return price;
    }

    public String getFlightTime() {
        return flightTime;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public void setFlightTime(String flightTime) {
        this.flightTime = flightTime;
    }

    public void setPrice(String price) {
        this.price = price;
    }
    
}
