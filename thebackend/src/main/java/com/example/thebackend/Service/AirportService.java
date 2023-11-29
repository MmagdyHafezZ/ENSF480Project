package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.AirportEntity;
import com.example.thebackend.Repository.AirportRepository;

/**
 * AirportService
 */
@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    // GET
    public List<AirportEntity> getAirportData(){
        return airportRepository.findAll();
    }

}