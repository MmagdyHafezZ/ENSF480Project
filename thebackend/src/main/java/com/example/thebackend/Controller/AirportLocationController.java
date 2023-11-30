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

import com.example.thebackend.Entity.AirportLocationEntity;
import com.example.thebackend.Service.AirportLocationService;

/**
 * AirportLocationController
 */
@RestController
public class AirportLocationController {

    @Autowired
    private AirportLocationService airportLocationService;

    @GetMapping(path = "/getAirportLocation")
    public List<AirportLocationEntity> getAirportLocation(){
        return airportLocationService.getAirportLocationData();
    }

    @GetMapping(path = "/getAirportLocation/{id}")
    public AirportLocationEntity getSingleAirportLocation(@PathVariable Long id){
        return airportLocationService.singleGet(id);
    }

    @PostMapping(path = "/postAirportLocation")
    public AirportLocationEntity postAirportLocation(@RequestBody AirportLocationEntity airportLocationEntity){
        return airportLocationService.postAirportLocation(airportLocationEntity);
    }

    @PutMapping(path = "/putAirportLocation/{id}")
    public AirportLocationEntity putAirportLocation(@PathVariable Long id, @RequestBody AirportLocationEntity existingData){
        return airportLocationService.updateAirportLocationEntity(id, existingData);
    }

    @DeleteMapping(path = "/deleteAirportLocation/{id}")
    public void deleteAirportLocation(@PathVariable Long id){
        airportLocationService.deleteAirportLocation(id);
    }
}