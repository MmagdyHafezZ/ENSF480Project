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
 * FlightListEntity
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "flightlist")
public class FlightListEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "iataorigin")
    private String iataorigin;

    @Column(name = "iatadest")
    private String iatadest;

    @Column(name = "departing")
    private String departing;

    @Column(name = "returning")
    private String returning;

    @Column(name = "model")
    private String model;

    @Column(name = "modelid")
    private String modelid;

    public Long getID(){
        return id;
    }

    public void setID(Long id){
        this.id = id;
    }

    public String getIATAOrigin(){
        return iataorigin;
    }

    public void setIATAOrigin(String iataorigin){
        this.iataorigin = iataorigin;
    }

    public String getIATADest(){
        return iatadest;
    }

    public void setIATADest(String iatadest){
        this.iatadest = iatadest;
    }

    public String getDeparting(){
        return departing;
    }

    public void setDeparting(String departing){
        this.departing = departing;
    }

    public String getReturning(){
        return returning;
    }

    public void setReturning(String returning){
        this.returning = returning;
    }

    public String getModel(){
        return model;
    }

    public void setModel(String model){
        this.model = model;
    }

    public String getModelID(){
        return modelid;
    }

    public void setModelID(String modelid){
        this.modelid = modelid;
    }
}