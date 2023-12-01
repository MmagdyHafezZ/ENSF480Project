package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.AirportLocationEntity;
import com.example.thebackend.Repository.AirportLocationRepository;

/**
 * AirportLocationService
 */
@Service
public class AirportLocationService {

    @Autowired
    private AirportLocationRepository airportLocationRepository;

    // GET
    public List<AirportLocationEntity> getAirportLocationData(){
        return airportLocationRepository.findAll();
    }

    // GET Single
    public AirportLocationEntity singleGet(Long id){
        return airportLocationRepository.findById(id).get();
    }
    
    // POST
    public AirportLocationEntity postAirportLocation(AirportLocationEntity airportLocationEntity){
        return airportLocationRepository.save(airportLocationEntity);
    }

    // PUT
    public AirportLocationEntity updateAirportLocationEntity(Long id, AirportLocationEntity existingData){
        AirportLocationEntity updateData = airportLocationRepository.findById(id).get();
        updateData.setIATA(existingData.getIATA());
        updateData.setParentRegion(existingData.getParentRegion());

        return airportLocationRepository.save(updateData);
    }

    // DELETE
    public void deleteAirportLocation(Long id){
        airportLocationRepository.deleteById(id);
    }

}