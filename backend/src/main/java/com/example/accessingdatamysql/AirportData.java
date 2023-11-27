package com.example.accessingdatamysql;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * AirportData
 */
@Entity
public class AirportData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String iata;
    private String city;
    private String state;
    private String country;

    public String getIATA(){
        return iata;
    }

    public void setIATA(String iata){
        this.iata = iata;
    }

    public String getCity(){
        return city;
    }

    public void setCity(String city){
        this.city = city;
    }

    public String getState(){
        return state;
    }

    public void setState(String state){
        this.state = state;
    }

    public String getCountry(){
        return country;
    }

    public void setCountry(String country){
        this.country = country;
    }    
}