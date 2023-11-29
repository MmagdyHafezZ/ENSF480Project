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

    @GetMapping(path = "/getBooking/{user_id}")
    public ManageBookingEntity getSingleBooking(@PathVariable Long user_id){
        return manageBookingService.singleGet(user_id);
    }

    @PostMapping(path = "/postBooking")
    public ManageBookingEntity postBooking(@RequestBody ManageBookingEntity manageBookingEntity){
        return manageBookingService.postManageBookingEntity(manageBookingEntity);
    }

    @PutMapping(path = "/putBooking/{user_id}")
    public ManageBookingEntity putBooking(@PathVariable Long user_id, @RequestBody ManageBookingEntity manageBookingEntity){
        return manageBookingService.updateManageBookingEntity(user_id, manageBookingEntity);
    }

    @DeleteMapping(path = "/deleteBooking/{user_id}")
    public void deleteBooking(@PathVariable Long user_id){
        manageBookingService.deleteManageBookingEntity(user_id);
    }
    
}