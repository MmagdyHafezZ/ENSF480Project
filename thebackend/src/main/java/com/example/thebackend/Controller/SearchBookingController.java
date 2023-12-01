package com.example.thebackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.thebackend.Entity.SearchBookingEntity;
import com.example.thebackend.Service.SearchBookingService;

/**
 * SearchBookingController
 */
@RestController
public class SearchBookingController {

    @Autowired
    private SearchBookingService searchBookingService;

    @GetMapping(path = "/getSearchBooking")
    public List<SearchBookingEntity> getSearchBooking(){
        return searchBookingService.getSearchBookingData();
    }

    @GetMapping(path = "/getSearchBooking/{id}")
    public SearchBookingEntity getSingleSearchBooking(@PathVariable Long id){
        return searchBookingService.singleGet(id);
    }

    @PostMapping(path = "/postSearchBooking")
    public SearchBookingEntity postSearchBooking(@RequestBody SearchBookingEntity searchBookingEntity){
        return searchBookingService.postSearchBooking(searchBookingEntity);
    }

    @DeleteMapping(path = "/deleteSearchBooking")
    public void deleteSearchBooking(){
        searchBookingService.deleteSearchBookingAll();
    }
    
}