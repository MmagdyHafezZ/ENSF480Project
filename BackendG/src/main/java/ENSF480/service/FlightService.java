package ENSF480.service;

import ENSF480.Backend.Model.Flight;
import ENSF480.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {
    @Autowired
    private FlightRepository flightRepository;

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // Other business methods like bookFlight, cancelFlight, etc.
}
