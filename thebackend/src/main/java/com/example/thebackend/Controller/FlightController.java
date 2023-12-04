package com.example.thebackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.thebackend.DTO.FlightListDTO;
import com.example.thebackend.Entity.Flights;
import com.example.thebackend.Service.FlightService;


@RestController
public class FlightController {
    @Autowired
    private FlightService flightService;

    @GetMapping(path = "/getFilteredFlightList")
    public List<FlightListDTO> getFilteredFlightList(
        @RequestParam String iata1, 
        @RequestParam String iata2, 
        @RequestParam String DepartureDay){
        return flightService.getFilteredFlightList(iata1, iata2, DepartureDay);
    }
    @GetMapping(path = "/getFlight/{id}")
    public Flights getFlight(@PathVariable Long id){
        return flightService.getFlight(id);
    }

    @GetMapping(path = "/getFlightLists")
    public List<Flights> getFlightList(){
        return flightService.getFlightListData();
    }
}
