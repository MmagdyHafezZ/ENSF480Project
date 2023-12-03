package com.example.thebackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.thebackend.Entity.SeatEntity;
import com.example.thebackend.Service.FlightReservationService;


@RestController
public class FlightReservationController {
    @Autowired
    FlightReservationService flightReservationService;

    
    @GetMapping(path = "/getSeats")
    public java.util.List<SeatEntity> getSeats(){
        return flightReservationService.getSeats();
    }
@GetMapping(path = "/getSeatsByFlightId/flightId={flightId}")
    public List<SeatEntity> getSeatsByFlightId(@PathVariable("flightId") Long flightId) {
        return flightReservationService.getSeatsByFlightId(flightId);
    }
}
