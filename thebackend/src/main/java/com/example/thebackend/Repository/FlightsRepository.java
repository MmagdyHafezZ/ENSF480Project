package com.example.thebackend.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.thebackend.Entity.Flights;

@Repository
public interface FlightsRepository extends JpaRepository<Flights, Long> {
    List<Flights> findByIata1AndIata2AndDepartureDay(String iata1, String iata2, String DepartureDay);

    
}
