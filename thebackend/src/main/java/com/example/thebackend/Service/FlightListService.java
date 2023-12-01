package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.FlightListEntity;
import com.example.thebackend.Repository.FlightListRepository;

/**
 * FlightListService
 */
@Service
public class FlightListService {

    @Autowired
    private FlightListRepository flightListRepository;

    // GET
    public List<FlightListEntity> getFlightListData(){
        return flightListRepository.findAll();
    }

    // Get Single
    public FlightListEntity singleGet(Long id){
        return flightListRepository.findById(id).get();
    }

    // POST
    public FlightListEntity postFlightList(FlightListEntity flightListEntity){
        return flightListRepository.save(flightListEntity);
    }

    // DELETE ALL ROWS
    public void deleteFlightListALL(){
        flightListRepository.deleteAllInBatch();
    }
    
}