package com.example.thebackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.thebackend.Entity.Flights;
import com.example.thebackend.Entity.SeatEntity;
import com.example.thebackend.Repository.FlightReservationRepository;
import com.example.thebackend.Repository.FlightsRepository;
import com.example.thebackend.Seed.SeedingCompleteEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FlightReservationService {

    @Autowired
    private FlightsRepository flightsRepository;

    @Autowired
    private FlightReservationRepository flightReservationRepository;
    
    @EventListener
    public void onSeedingComplete(SeedingCompleteEvent event) {
        generateSeatsForFlights();
    }
    @Transactional
    public void generateSeatsForFlights() {
        List<Flights> flights = flightsRepository.findAll();
        flights.parallelStream().forEach(flight -> {
            List<SeatEntity> seats = generateSeatsForFlight(flight, flight.getPlaneType());
            flightReservationRepository.saveAll(seats);
        });
    }

    private List<SeatEntity> generateSeatsForFlight(Flights flight, char planeType) {
        return planeType == 'A' ? generateSeatsForType(flight, "A", 19) : generateSeatsForType(flight, "B", 37);
    }

    private List<SeatEntity> generateSeatsForType(Flights flight, String type, int numberOfRows) {
        List<SeatEntity> seats = new ArrayList<>();
        String[] seatRows = type.equals("A") ? new String[]{"A", "B", "C", "D"} : new String[]{"A", "B", "C", "D", "E", "F"};

        for (String row : seatRows) {
            for (int number = 1; number <= numberOfRows; number++) {
                if (!(type.equals("A") && row.equals("B") && number < 5)) {
                    seats.add(createSeatEntity(flight, row, number, type));
                }
            }
        }
        return seats;
    }

    private SeatEntity createSeatEntity(Flights flight, String row, int number, String type) {
        SeatEntity seat = new SeatEntity();
        seat.setFlight(flight);
        seat.setSeatType(determineSeatType(row, type));
        seat.setIsAvailable(true);
        seat.setSeatID(row + number);
        return seat;
    }

    private String determineSeatType(String row, String type) {
        if (type.equals("A")) {
            return row.equals("A") ? "business" : row.equals("B") ? "comfort" : "ordinary";
        } else { // Plane Type B
            return row.matches("[AB]") ? "business" : row.matches("[CD]") ? "comfort" : "ordinary";
        }
    }
    public List<SeatEntity> getSeats() {
        return flightReservationRepository.findAll();

    }
    public List<SeatEntity> getSeatsByFlightId(Long flightId) {
        return flightReservationRepository.findByFlight_Id(flightId);
    }
}
