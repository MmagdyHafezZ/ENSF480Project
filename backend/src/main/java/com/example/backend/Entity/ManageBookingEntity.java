package com.example.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * ManageBookingEntity
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "managebooking")
public class ManageBookingEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "passenger")
    private String passenger;

    @Column(name = "flight")
    private String flight;

    @Column(name = "confirm")
    private String confirm;

    @Column(name = "seat")
    private String seat;

    public void setID(Long id){
        this.id = id;
    }

    public Long getID(){
        return id;
    }

    public void setPassenger(String passenger){
        this.passenger = passenger;
    }

    public String getPassenger(){
        return passenger;
    }

    public void setFlight(String flight){
        this.flight = flight;
    }

    public String getFlight(){
        return flight;
    }

    public void setConfirm(String confirm){
        this.confirm = confirm;
    }

    public String getConfirm(){
        return confirm;
    }

    public void setSeat(String seat){
        this.seat = seat;
    }

    public String getSeat(){
        return seat;
    }


}