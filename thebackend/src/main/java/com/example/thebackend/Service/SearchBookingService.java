package com.example.thebackend.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.thebackend.Entity.AircraftModelEntity;
import com.example.thebackend.Entity.FlightListEntity;
import com.example.thebackend.Entity.SearchBookingEntity;
import com.example.thebackend.Repository.AircraftModelRepository;
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

    @Autowired
    private AircraftModelRepository aircraftModelRepository;

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

        String isoDepartingDate = searchBookingEntity.getDeparting();
        ZonedDateTime zonedDepartingDateTime = ZonedDateTime.parse(isoDepartingDate);
        LocalDateTime localDepartingDateTime = zonedDepartingDateTime.toLocalDateTime();            
        String departdate = localDepartingDateTime.format(dateFormatter);

        String isoReturningDate = searchBookingEntity.getReturning();
        ZonedDateTime zonedReturningDateTime = ZonedDateTime.parse(isoReturningDate);
        LocalDateTime localReturninggDateTime = zonedReturningDateTime.toLocalDateTime();
        String returndate = localReturninggDateTime.format(dateFormatter);

        
        for(int i = 0; i < 5; i++){
            FlightListEntity flightListEntity = new FlightListEntity();
            flightListEntity.setSearchbookingid(searchBookingEntity);
            flightListEntity.setIataorigin(searchBookingEntity.getIATAOrigin());
            flightListEntity.setIatadest(searchBookingEntity.getIATADest());
            flightListEntity.setDepartdate(departdate);
            flightListEntity.setReturndate(returndate);

            String departtime = Integer.toString(new Random().nextInt(24 - 5 + 1) + 5);
            String returntime = Integer.toString(new Random().nextInt(24 - 5 + 1) + 5);

            flightListEntity.setDeparttime(departtime + ":00");
            flightListEntity.setReturntime(returntime + ":00");

            long aircraftpicker = new Random().nextLong(aircraftModelRepository.count());

            AircraftModelEntity aircraftModelEntity = aircraftModelRepository.findAll().get((int) aircraftpicker);

            System.out.println(aircraftModelEntity);
            System.out.println(aircraftModelEntity.getModel());
            System.out.println(aircraftModelEntity.getModelid());

            flightListEntity.setModel(aircraftModelEntity.getModel());
            flightListEntity.setModelid(aircraftModelEntity.getModelid());

            flightListRepository.save(flightListEntity);
        }
        return searchBookingEntity;
    }

    // DELETE All
    public void deleteSearchBookingAll(){
        flightListRepository.deleteAllInBatch();
        searchBookingRepository.deleteAllInBatch();
    }

}