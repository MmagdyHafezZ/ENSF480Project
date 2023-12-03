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
// Other parts of the class remain unchanged

private List<SeatEntity> generateSeatsForType(Flights flight, String type, int numberOfRows) {
    List<SeatEntity> seats = new ArrayList<>();
    String[] seatRows = type.equals("A") ? new String[]{"A", "B", "C", "D"} : new String[]{"A", "B", "C", "D", "E", "F"};

    for (String row : seatRows) {
        for (int number = 1; number <= numberOfRows; number++) {
            seats.add(createSeatEntity(flight, row, number, type));
        }
    }
    return seats;
}

private SeatEntity createSeatEntity(Flights flight, String row, int number, String type) {
    SeatEntity seat = new SeatEntity();
    seat.setFlight(flight);
    seat.setSeatType(determineSeatType(row, number, type)); // Pass number as well
    seat.setIsAvailable(true);
    seat.setSeatID(row + number);
    return seat;
}

private String determineSeatType(String row, int number, String type) {
    if (type.equals("A")) {
        // Type A plane seating logic
        if (number <= 4) return "business";
        else if (number <= 10) return "comfort";
        else return "ordinary";
    } else {
        // Type B plane seating logic
        if (number <= 4) return "business";
        else if (number <= 15) return "comfort";
        else return "ordinary";
    }
}

// Rest of the class remains the same
    public List<SeatEntity> getSeats() {
        return flightReservationRepository.findAll();

    }
    public List<SeatEntity> getSeatsByFlightId(Long flightId) {
        return flightReservationRepository.findByFlight_Id(flightId);
    }
}
