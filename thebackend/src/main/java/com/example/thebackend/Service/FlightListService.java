package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.DTO.FlightListResponse;
import com.example.thebackend.Entity.FlightEntity;
import com.example.thebackend.Entity.FlightListEntity;
import com.example.thebackend.Entity.ManageBookingEntity;
import com.example.thebackend.Entity.SearchBookingEntity;
import com.example.thebackend.Repository.FlightListRepository;

/**
 * FlightListService
 */
@Service
public class FlightListService {

    @Autowired
    private FlightListRepository flightListRepository;

    // GET
    public List<FlightListEntity> getFlightListData(){
        return flightListRepository.findAll();
    }    

    // GET Single
    public FlightListEntity singleGet(Long id){
        return flightListRepository.findById(id).get();
    }

    // POST
    public FlightListEntity postFlightListEntity(FlightListEntity flightListEntity){
        return flightListRepository.save(flightListEntity);
    }

    // PUT
    public FlightListEntity updateFlightListEntity(Long id, FlightListEntity existingData){
        FlightListEntity updateData = flightListRepository.findById(id).get();
        updateData.setSearchbookingid(existingData.getSearchbookingid());
        updateData.setIatadest(existingData.getIatadest());
        updateData.setIataorigin(existingData.getIataorigin());
        updateData.setDepartdate(existingData.getDepartdate());
        updateData.setReturndate(existingData.getReturndate());
        updateData.setDeparttime(existingData.getDeparttime());
        updateData.setReturntime(existingData.getReturntime());
        updateData.setModel(existingData.getModel());
        updateData.setModelid(existingData.getModelid());

        return flightListRepository.save(updateData);
    }
    
    // DELETE
    public void deleteFlightListEntity(Long id){
        flightListRepository.deleteById(id);
    }
    
}