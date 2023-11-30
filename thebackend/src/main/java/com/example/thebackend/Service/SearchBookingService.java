package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.SearchBookingEntity;
import com.example.thebackend.Repository.SearchBookingRepository;

/**
 * SearchBookingService
 */
@Service
public class SearchBookingService {

    @Autowired
    private SearchBookingRepository searchBookingRepository;

    // GET
    public List<SearchBookingEntity> getSearchBookingData(){
        return searchBookingRepository.findAll();
    }

    // GET Single
    public SearchBookingEntity singleGet(Long id){
        return searchBookingRepository.findById(id).get();
    }

    // POST
    public SearchBookingEntity postSearchBooking(SearchBookingEntity searchBookingEntity){
        return searchBookingRepository.save(searchBookingEntity);
    }

}