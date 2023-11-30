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

    @Column(name = "row")
    private int row;

    @Column(name = "column")
    private int column;

    public AircraftModelEntity(){
    }

    public AircraftModelEntity(Long id, String model, int seatcapacity, int row, int column){
        this.id = id;
        this.model = model;
        this.seatcapacity = seatcapacity;
        this.row = row;
        this.column = column;
    }
    
    public void setID(Long id){
        this.id = id;
    }

    public Long getID(){
        return id;
    }

    public void setModel(String model){
        this.model = model;
    }

    public String getModel(){
        return model;
    }
    
    public void setSeatcapacity(int seatcapacity) {
        this.seatcapacity = seatcapacity;
    }

    public int getSeatcapacity() {
        return this.seatcapacity;
    }

    public void setRow(int row){
        this.row = row;
    }

    public int getRow(int row){
        return row;
    }

    public void setColumn(int column){
        this.column = column;
    }

    public int getColumn(){
        return column;
    }

}