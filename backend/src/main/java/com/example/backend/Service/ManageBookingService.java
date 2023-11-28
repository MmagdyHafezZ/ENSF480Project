package com.example.backend.Service;

import java.util.List;
import java.util.Optional;

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
    
    // DELETE
    public void deleteManageBookingData(Long id){
        manageBookingRepository.deleteById(id);
    }

    public ManageBookingEntity updateManageBookingData(Long id, ManageBookingEntity existingData){
        ManageBookingEntity updateData = manageBookingRepository.findById(id).get();
        updateData.setPassenger(existingData.getPassenger());
        updateData.setFlight(existingData.getFlight());
        updateData.setConfirm(existingData.getConfirm());

        return manageBookingRepository.save(updateData);
    }

}