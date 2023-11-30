package com.example.thebackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * AircraftModelEntity
 */
@Entity
@Table(name = "aircraftmodel")
public class AircraftModelEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "model")
    private String model;

    @Column(name = "seatcapacity")
    private int seatcapacity;

    @Column(name = "rownumber")
    private int rownumber;

    @Column(name = "columnnumber")
    private int columnnumber;

    public AircraftModelEntity(String model, int seatcapacity, int rownumber, int columnnumber){
        this.model = model;
        this.seatcapacity = seatcapacity;
        this.rownumber = rownumber;
        this.columnnumber = columnnumber;
    }
    
    public Long getID(){
        return id;
    }
    
    public void setID(Long id){
        this.id = id;
    }
    
    public String getModel(){
        return model;
    }
    
    public void setModel(String model){
        this.model = model;
    }
    
    public int getSeatcapacity() {
        return seatcapacity;
    }

    public void setSeatcapacity(int seatcapacity) {
        this.seatcapacity = seatcapacity;
    }

    public int getRowNumber(){
        return rownumber;
    }
    
    public void setRowNumber(int rownumber){
        this.rownumber = rownumber;
    }
    
    public int getColumnNumber(){
        return columnnumber;
    }
    
    public void setColumnNumber(int columnnumber){
        this.columnnumber = columnnumber;
    }
}