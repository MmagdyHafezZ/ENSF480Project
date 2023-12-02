package com.example.thebackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

/**
 * AircraftModelEntity
 */
@Entity
@NoArgsConstructor
@Table(name = "aircraftmodel")
public class AircraftModelEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "model")
    private String model;

    @Column(name = "modelid")
    private String modelid;

    @Column(name = "seatcapacity")
    private int seatcapacity;

    @Column(name = "rownumber")
    private int rownumber;

    @Column(name = "columnnumber")
    private int columnnumber;

    public AircraftModelEntity(String model, String modelid, int seatcapacity, int rownumber, int columnnumber){
        this.model = model;
        this.modelid = modelid;
        this.seatcapacity = seatcapacity;
        this.rownumber = rownumber;
        this.columnnumber = columnnumber;
    }
    
    public Long getId(){
        return id;
    }
    
    public void setId(Long id){
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

    public String getModelid(){
        return modelid;
    }

    public void setModelid(String modelid){
        this.modelid = modelid;
    }
}