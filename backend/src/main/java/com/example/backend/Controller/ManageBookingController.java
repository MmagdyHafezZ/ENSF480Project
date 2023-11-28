package com.example.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Entity.ManageBookingEntity;
import com.example.backend.Service.ManageBookingService;

/**
 * ManageBookingController
 */
@RestController
public class ManageBookingController {

    @Autowired
    private ManageBookingService manageBookingService;

    @GetMapping(path = "/getBooking")
    public List<ManageBookingEntity> getBooking(){
        return manageBookingService.getManageBookingData();
    }

    @PostMapping(path = "/postBooking")
    public ManageBookingEntity postBooking(@RequestBody ManageBookingEntity manageBookingEntity){
        return manageBookingService.postManageBookingEntity(manageBookingEntity);
    }

    @PutMapping(path = "/putBooking")
    public ManageBookingEntity putBooking(@PathVariable Long id, @RequestBody ManageBookingEntity manageBookingEntity){
        return manageBookingService.updateManageBookingEntity(id, manageBookingEntity);
    }

    @DeleteMapping(path = "/deleteBooking")
    public void deleteBooking(@PathVariable Long id){
        manageBookingService.deleteManageBookingEntity(id);
    }
    
}