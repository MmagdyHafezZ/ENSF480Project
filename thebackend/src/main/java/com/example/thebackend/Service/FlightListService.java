package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.DTO.FlightListResponse;
import com.example.thebackend.Entity.FlightListEntity;
import com.example.thebackend.Entity.ManageBookingEntity;
import com.example.thebackend.Entity.SearchBookingEntity;
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

    // GET Single
    public FlightListEntity singleGet(Long id){
        return flightListRepository.findById(id).get();
    }
    
}