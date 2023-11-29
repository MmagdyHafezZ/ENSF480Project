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
 * ManageBookingEntity
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "managebooking")
public class ManageBookingEntity {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(name = "passenger")
    private String passenger;

    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

    @Column(name = "confirm")
    private String confirm;

    @Column(name = "seat")
    private String seat;

    @Column(name = "meal")
    private String meal;

    public void setID(Long user_id){
        this.user_id = user_id;
    }

    public Long getID(){
        return user_id;
    }

    public void setPassenger(String passenger){
        this.passenger = passenger;
    }

    public String getPassenger(){
        return passenger;
    }

    public void setOrigin(String origin){
        this.origin = origin;
    }

    public String getOrigin(){
        return origin;
    }

    public void setDestination(String destination){
        this.destination = destination;
    }

    public String getDestination(){
        return destination;
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

    public void setMeal(String meal){
        this.meal = meal;
    }

    public String getMeal(){
        return meal;
    }

}