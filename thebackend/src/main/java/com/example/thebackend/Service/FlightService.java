package com.example.thebackend.Service;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.thebackend.DTO.FlightListDTO;
import com.example.thebackend.Entity.Flights;
import com.example.thebackend.Repository.FlightsRepository;

@Service
public class FlightService {
    @Autowired
    private FlightsRepository flightsRepository;

    public List<Flights> getFlightListData(){
        return flightsRepository.findAll();
    }    

    public Flights singleGet(Long id){
        return flightsRepository.findById(id).orElse(null);
    }

    public List<FlightListDTO> getFilteredFlightList(String iata1, String iata2, String DepartureDay) {
        System.out.println("iata1: " + iata1);
        System.out.println("iata2: " + iata2);
        System.out.println("departureDay: " + DepartureDay);
        List<Flights> flights = flightsRepository.findByIata1AndIata2AndDepartureDay(iata1, iata2, DepartureDay);
        return flights.stream()
                      .map(this::convertToDTO)
                      .collect(Collectors.toList());
    }

    private FlightListDTO convertToDTO(Flights flight) {
        FlightListDTO dto = new FlightListDTO();
        dto.setId(flight.getId());
        dto.setIata1(flight.getIata1());
        dto.setIata2(flight.getIata2());
        dto.setarrival_day(flight.getArrivalDay());
        dto.setdeparture_day(flight.getDepartureDay());
        dto.setarrival_time(flight.getArrivalTime());
        dto.setdeparture_time(flight.getDepartureTime());
        dto.setOrdinaryPrice(flight.getOrdinaryPrice());
        dto.setBusinessPrice(flight.getBusinessPrice());
        dto.setComfortPrice(flight.getComfortPrice());
        dto.setPlaneType(flight.getPlaneType());
        
        return dto;
    }
    public boolean checkFlight(Long id) {
        return flightsRepository.existsById(id);
    }

    public Flights getFlight(Long id) {
        return flightsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Flight not found with id: " + id));
    }
}
