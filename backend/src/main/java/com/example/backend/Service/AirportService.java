package com.example.backend.Service;

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
    
    public AirportEntity saveAirportData(AirportEntity airportEntity){
        return airportRepository.save(airportEntity);
    }

}