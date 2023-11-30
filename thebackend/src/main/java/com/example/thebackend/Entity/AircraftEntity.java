package com.example.thebackend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


/**
 * AircraftEntity
 */
@Entity
@Table(name = "aircraft")
public class AircraftEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @@Column(name = "id")
    private Long id;    

    @Column(name = "modelid")
    private int modelid;

    public AircraftEntity(int modelid){
        this.modelid = modelid;
    }

    public Long getID(){
        return id;
    }

    public void setID(Long id){
        this.id = id;
    }

    public int getModelID(){
        return modelid;
    }

    public void setModelID(int modelid){
        this.modelid;
    }

}