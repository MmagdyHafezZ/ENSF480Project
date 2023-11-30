package com.example.thebackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * AirportLocationEntity
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "airportlocation")
public class AirportLocationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "iata")
    private String iata;
    
    @Column(name = "parentregionid")
    private int parentregionid;
    
    public AirportLocationEntity(String iata, int parentregionid){
        this.iata = iata;
        this.parentregionid = parentregionid;
    }

    public Long getID(){
        return id;
    }

    public void setID(Long id){
        this.id = id;
    }

    public String getIATA(){
        return iata;
    }

    public void setIATA(String iata){
        this.iata = iata;
    }

    public int getParentRegion(){
        return parentregionid;
    }

    public void setParentRegion(int parentregionid){
        this.parentregionid = parentregionid;
    }

    
}