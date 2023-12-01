package com.example.thebackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.thebackend.DTO.FlightListRequest;
import com.example.thebackend.DTO.FlightListResponse;
import com.example.thebackend.Entity.FlightListEntity;
import com.example.thebackend.Repository.SearchBookingRepository;
import com.example.thebackend.Service.FlightListService;

/**
 * FlightListController
 */
@RestController
public class FlightListController {

    @Autowired
    private FlightListService flightListService;

    @Autowired
    private SearchBookingRepository searchBookingRepository;


    @GetMapping(path = "/getFlightList")
    public List<FlightListResponse> getFlightList(){
        return flightListService.getFlightListData();
    }

    // @GetMapping(path = "/getFlightList/{id}")
    // public FlightListResponse getSingleFlightList(@PathVariable Long id){
    //     return flightListService.singleGet(id);
    // }

    @PostMapping(path = "/postFlightList")
    public FlightListEntity postFlightList(@RequestBody FlightListRequest flightListRequest){
        return flightListService.postFlightList(flightListRequest);
    }

    @DeleteMapping(path = "/deleteFlightList")
    public void deleteFlightListALL(){
        flightListService.deleteFlightListALL();
    }
}