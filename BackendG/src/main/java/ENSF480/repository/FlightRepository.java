package ENSF480.repository;

import ENSF480.Backend.Model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    // Custom query methods, if needed
}
