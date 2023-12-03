package com.example.thebackend.Entity;

public class FlightsDetails {
    private String flightNumber;
    private String departure_day;
    private String arrival_day;
    private String departure_time;
    private String price;
    private String iata1;
    private String iata2;

    public FlightsDetails(String flightNumber, String departure_day, String arrival_day, String departure_time, String price) {
        this.flightNumber = flightNumber;
        this.departure_day = departure_day;
        this.arrival_day = arrival_day;
        this.departure_time = departure_time;
        this.price = price;
    }
    public String setiata1(String iata1){
        return this.iata1 = iata1;
    }
    public String setiata2(String iata2){
        return this.iata2 = iata2;
    }
    public String getiata1(){
        return iata1;
    }
    public String getiata2(){
        return iata2;
    }


    public FlightsDetails() {
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public String getDeparture() {
        return departure_day;
    }

    public String getArrival() {
        return arrival_day;
    }

    public String getPrice() {
        return price;
    }

    public String getFlightTime() {
        return departure_time;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public void setDeparture(String departure_day) {
        this.departure_day = departure_day;
    }

    public void setArrival(String arrival_day) {
        this.arrival_day = arrival_day;
    }

    public void setFlightTime(String departure_time) {
        this.departure_time = departure_time;
    }

    public void setPrice(String price) {
        this.price = price;
    }
    
}
