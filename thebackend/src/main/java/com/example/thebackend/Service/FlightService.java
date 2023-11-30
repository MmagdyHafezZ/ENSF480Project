package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.FlightEntity;
import com.example.thebackend.Repository.FlightRepository;

/**
 * FlightService
 */
@Service
public class FlightService {

    @Autowired
    private FlightRepository flightRepository;
    
    // GET
    public List<FlightEntity> getFlightData(){
        return flightRepository.findAll();
    }

    // GET Single
    public FlightEntity singleGet(Long id){
        return flightRepository.findById(id).get();
    }

    // POST
    public FlightEntity postFlightEntity(FlightEntity flightEntity){
        return flightRepository.save(flightEntity);
    }

    // PUT
    public FlightEntity updateFlightEntity(Long id, FlightEntity existingData){
        FlightEntity updateData = flightRepository.findById(id).get();
        updateData.setDepartureAirport(existingData.getDepartureAirport());
        updateData.setArrivalAirport(existingData.getArrivalAirport());
        updateData.setDepartureDate(existingData.getDepartureDate());
        updateData.setArrivalDate(existingData.getArrivalDate());
        updateData.setDepartureTime(existingData.getDepartureTime());
        updateData.setArrivalTime(existingData.getArrivalTime());

        return flightRepository.save(updateData);
    }
    
    // DELETE
    public void deleteFlightEntity(Long id){
        flightRepository.deleteById(id);
    }

}