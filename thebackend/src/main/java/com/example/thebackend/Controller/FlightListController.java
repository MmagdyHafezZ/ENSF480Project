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

import com.example.thebackend.Entity.FlightListEntity;
import com.example.thebackend.Entity.ManageBookingEntity;
import com.example.thebackend.Service.FlightListService;

/**
 * FlightListController
 */
@RestController
public class FlightListController {

    @Autowired
    FlightListService flightListService;

    @GetMapping(path = "/getFlightList")
    public List<FlightListEntity> getFlightList(){
        return flightListService.getFlightListData();
    }

    @GetMapping(path = "/getFlightList/{id}")
    public FlightListEntity getSingleBooking(@PathVariable Long id){
        return flightListService.singleGet(id);
    }

    @PostMapping(path = "/postFlightList")
    public FlightListEntity postBooking(@RequestBody FlightListEntity flightListEntity){
        return flightListService.postFlightListEntity(flightListEntity);
    }

    @PutMapping(path = "/putFlightList/{id}")
    public FlightListEntity putBooking(@PathVariable Long id, @RequestBody FlightListEntity flightListEntity){
        return flightListService.updateFlightListEntity(id, flightListEntity);
    }

    @DeleteMapping(path = "/deleteFlightList/{id}")
    public void deleteBooking(@PathVariable Long id){
        flightListService.deleteFlightListEntity(id);
    }

}