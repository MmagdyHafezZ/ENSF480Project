package com.example.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Entity.AirportEntity;
import com.example.backend.Service.AirportService;

/**
 * AirportController
 */
@RestController
public class AirportController {

    @Autowired
    private AirportService airportService;



    @GetMapping(path = "/getAirport")
    public List<AirportEntity> getAirportEntities(){
        System.out.println(airportService.getAirportData());
        return airportService.getAirportData();
    }
    
}