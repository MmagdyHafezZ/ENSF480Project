package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.ManageBookingEntity;
import com.example.thebackend.Repository.ManageBookingRepository;

/**
 * ManageBookingService
 */
@Service
public class ManageBookingService {

    @Autowired
    private ManageBookingRepository manageBookingRepository;
    
    // GET
    public List<ManageBookingEntity> getManageBookingData(){
        return manageBookingRepository.findAll();
    }

    // GET Single
    public ManageBookingEntity singleGet(Long user_id){
        return manageBookingRepository.findById(user_id).get();
    }

    // POST
    public ManageBookingEntity postManageBookingEntity(ManageBookingEntity manageBookingEntity){
        return manageBookingRepository.save(manageBookingEntity);
    }

    // PUT
    public ManageBookingEntity updateManageBookingEntity(Long user_id, ManageBookingEntity existingData){
        ManageBookingEntity updateData = manageBookingRepository.findById(user_id).get();
        updateData.setPassenger(existingData.getPassenger());
        updateData.setOrigin(existingData.getOrigin());
        updateData.setDestination(existingData.getDestination());
        updateData.setConfirm(existingData.getConfirm());
        updateData.setSeat(existingData.getSeat());
        updateData.setMeal(existingData.getMeal());

        return manageBookingRepository.save(updateData);
    }
    
    // DELETE
    public void deleteManageBookingEntity(Long user_id){
        manageBookingRepository.deleteById(user_id);
    }

}