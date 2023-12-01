package com.example.thebackend.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * SearchBooking
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "searchbooking")
public class SearchBookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "iataorigin")
    private String iataorigin;

    @Column(name = "iatadest")
    private String iatadest;

    @Column(name = "travellers")
    private int travellers;

    @Column(name = "departing")
    private String departing;

    @Column(name = "returning")
    private String returning;

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

    public int getTravellers(){
        return travellers;
    }

    public void setTravellers(int travellers){
        this.travellers = travellers;
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
}