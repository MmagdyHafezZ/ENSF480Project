package com.example.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/addAirport")
    public AirportEntity postAirport(@RequestBody AirportEntity airportEntity){
        return airportService.saveAirportData(airportEntity);
    }
    
}