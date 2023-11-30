package com.example.thebackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.thebackend.Entity.FlightEntity;
import com.example.thebackend.Service.FlightService;

/**
 * FlightEntityController
 */
@RestController
public class FlightEntityController {

    @Autowired
    private FlightService flightService;

    @GetMapping(path = "/getFlight")
    public List<FlightEntity> getBooking(){
        return flightService.getFlightData();
    }

    @GetMapping(path = "/getFlight/{id}")
    public FlightEntity getSingleBooking(@PathVariable Long id){
        return flightService.singleGet(id);
    }

    @PostMapping(path = "/postFlight")
    public FlightEntity postBooking(@RequestBody FlightEntity flightEntity){
        return flightService.postFlightEntity(flightEntity);
    }

    @PutMapping(path = "/putFlight/{id}")
    public FlightEntity putBooking(@PathVariable Long id, @RequestBody FlightEntity flightEntity){
        return flightService.updateFlightEntity(id, flightEntity);
    }

    @DeleteMapping(path = "/deleteFlight/{id}")
    public void deleteBooking(@PathVariable Long id){
        flightService.deleteFlightEntity(id);
    }
    
}