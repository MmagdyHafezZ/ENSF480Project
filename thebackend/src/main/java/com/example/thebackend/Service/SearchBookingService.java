package com.example.thebackend.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.thebackend.Entity.FlightListEntity;
import com.example.thebackend.Entity.SearchBookingEntity;
import com.example.thebackend.Repository.FlightListRepository;
import com.example.thebackend.Repository.SearchBookingRepository;

/**
 * SearchBookingService
 */
@Service
public class SearchBookingService {

    @Autowired
    private SearchBookingRepository searchBookingRepository;

    @Autowired
    private FlightListRepository flightListRepository;

    // GET
    public List<SearchBookingEntity> getSearchBookingData(){
        return searchBookingRepository.findAll();
    }

    // GET Single
    public SearchBookingEntity singleGet(Long id){
        return searchBookingRepository.findById(id).get();
    }

    // POST
    @Transactional
    public SearchBookingEntity postSearchBooking(SearchBookingEntity searchBookingEntity){
        searchBookingEntity = searchBookingRepository.save(searchBookingEntity);

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

        String isoDepartingDate = searchBookingEntity.getDeparting();
        ZonedDateTime zonedDepartingDateTime = ZonedDateTime.parse(isoDepartingDate);
        LocalDateTime localDepartingDateTime = zonedDepartingDateTime.toLocalDateTime();            
        String departdate = localDepartingDateTime.format(dateFormatter);
        String departtime = localDepartingDateTime.format(timeFormatter);

        String isoReturningDate = searchBookingEntity.getReturning();
        ZonedDateTime zonedReturningDateTime = ZonedDateTime.parse(isoReturningDate);
        LocalDateTime localReturninggDateTime = zonedReturningDateTime.toLocalDateTime();
        String returndate = localReturninggDateTime.format(dateFormatter);
        String returntime = localDepartingDateTime.format(timeFormatter);

        
        for(int i = 0; i < 3; i++){
            FlightListEntity flightListEntity = new FlightListEntity();
            flightListEntity.setSearchbookingid(searchBookingEntity);
            flightListEntity.setIataorigin(searchBookingEntity.getIATAOrigin());
            flightListEntity.setIatadest(searchBookingEntity.getIATADest());
            flightListEntity.setDepartdate(departdate);
            flightListEntity.setReturndate(returndate);
            flightListEntity.setDeparttime(departtime);
            flightListEntity.setReturntime(returntime);



            flightListRepository.save(flightListEntity);
        }
        return searchBookingEntity;
    }

}