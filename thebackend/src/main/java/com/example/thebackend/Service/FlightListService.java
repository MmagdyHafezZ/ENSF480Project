package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.DTO.FlightListRequest;
import com.example.thebackend.DTO.FlightListResponse;
import com.example.thebackend.Entity.FlightListEntity;
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

    // GET
    public List<FlightListResponse> getFlightListData(){
        return flightListRepository.joinFlightBooking();
    }

    // // Get Single
    // public FlightListResponse singleGet(Long id){
    //     return flightListRepository.findById(id).get();
    // }

    // POST
    public FlightListEntity postFlightList(FlightListRequest flightListRequest){
        return flightListRepository.save(flightListRequest.getFlightListEntity());
    }

    // DELETE ALL ROWS
    public void deleteFlightListALL(){
        flightListRepository.deleteAllInBatch();
    }
    
}