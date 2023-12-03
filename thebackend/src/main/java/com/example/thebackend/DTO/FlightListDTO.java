package com.example.thebackend.DTO;


public class FlightListDTO {
    private Long id;
    private String iata1;
    private String iata2;
    private String arrival_day;
    private String departure_day;
    private String arrival_time;
    private String departure_time;
    private int ordinaryPrice;
    private int businessPrice;
    private int comfortPrice;
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

    // arrival_day
    public String getarrival_day() { return arrival_day; }
    public void setarrival_day(String arrival_day) { this.arrival_day = arrival_day; }

    // departure_day
    public String getdeparture_day() { return departure_day; }
    public void setdeparture_day(String departure_day) { this.departure_day = departure_day; }

    // arrival_time
    public String getarrival_time() { return arrival_time; }
    public void setarrival_time(String arrival_time) { this.arrival_time = arrival_time; }

    // departure_time
    public String getdeparture_time() { return departure_time; }
    public void setdeparture_time(String departure_time) { this.departure_time = departure_time; }

    // ordinaryPrice
    public int getOrdinaryPrice() { return ordinaryPrice; }
    public void setOrdinaryPrice(int ordinaryPrice) { this.ordinaryPrice = ordinaryPrice; }

    // businessPrice
    public int getBusinessPrice() { return businessPrice; }
    public void setBusinessPrice(int businessPrice) { this.businessPrice = businessPrice; }

    // comfortPrice
    public int getComfortPrice() { return comfortPrice; }
    public void setComfortPrice(int comfortPrice) { this.comfortPrice = comfortPrice; }
    public void setPlaneType(Character planeType) {
        this.planeType = planeType;
    }
    public Character getPlaneType() {
        return planeType;
    }


    
}
