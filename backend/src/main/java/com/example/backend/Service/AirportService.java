package com.example.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Entity.AirportEntity;
import com.example.backend.Repository.AirportRepository;

/**
 * AirportService
 */
@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;
    
    // public AirportEntity postAirportData(AirportEntity airportEntity){
    //     return airportRepository.save(airportEntity);
    // }

    public List<AirportEntity> getAirportData(){
        return airportRepository.findAll();
    }

}