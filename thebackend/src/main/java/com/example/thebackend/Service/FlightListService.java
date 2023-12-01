package com.example.thebackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.DTO.FlightListResponse;
import com.example.thebackend.Entity.FlightListEntity;
import com.example.thebackend.Entity.SearchBookingEntity;
import com.example.thebackend.Repository.FlightListRepository;
import com.example.thebackend.Repository.SearchBookingRepository;

/**
 * FlightListService
 */
@Service
public class FlightListService {

    @Autowired
    private FlightListRepository flightListRepository;

    @Autowired
    private SearchBookingRepository searchBookingRepository;

    public FlightListEntity postFlightList(FlightListResponse flightListResponse){
        Long searchbookingid = flightListResponse.getId();

        SearchBookingEntity searchBookingEntity = searchBookingRepository.findById(searchbookingid).orElseThrow(() -> new RuntimeException("Search Booking ID not found with id: " + searchbookingid));

        FlightListEntity flightListEntity = new FlightListEntity();

        flightListEntity.setSearchbookingid(searchBookingEntity);

        return flightListRepository.save(flightListEntity);
    }
    
}