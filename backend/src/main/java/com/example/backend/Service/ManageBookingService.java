package com.example.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Entity.ManageBookingEntity;
import com.example.backend.Repository.ManageBookingRepository;

/**
 * ManageBookingService
 */
@Service
public class ManageBookingService {

    @Autowired
    private ManageBookingRepository manageBookingRepository;

    // POST
    public ManageBookingEntity postManageBookingData(ManageBookingEntity manageBookingEntity){
        return manageBookingRepository.save(manageBookingEntity);
    }

    // GET
    public List<ManageBookingEntity> getManageBookingData(){
        return manageBookingRepository.findAll();
    }
    
    // PUT
    
}