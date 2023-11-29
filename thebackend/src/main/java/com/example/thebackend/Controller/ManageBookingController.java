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

import com.example.thebackend.Entity.ManageBookingEntity;
import com.example.thebackend.Service.ManageBookingService;

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

    @GetMapping(path = "/getBooking/{id}")
    public ManageBookingEntity getSingleBooking(@PathVariable Long id){
        return manageBookingService.singleGet(id);
    }

    @PostMapping(path = "/postBooking")
    public ManageBookingEntity postBooking(@RequestBody ManageBookingEntity manageBookingEntity){
        return manageBookingService.postManageBookingEntity(manageBookingEntity);
    }

    @PutMapping(path = "/putBooking/{id}")
    public ManageBookingEntity putBooking(@PathVariable Long id, @RequestBody ManageBookingEntity manageBookingEntity){
        return manageBookingService.updateManageBookingEntity(id, manageBookingEntity);
    }

    @DeleteMapping(path = "/deleteBooking/{id}")
    public void deleteBooking(@PathVariable Long id){
        manageBookingService.deleteManageBookingEntity(id);
    }
    
}