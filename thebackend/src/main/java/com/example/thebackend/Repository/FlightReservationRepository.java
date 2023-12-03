package com.example.thebackend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.thebackend.Entity.SeatEntity;

public interface FlightReservationRepository extends JpaRepository<SeatEntity, Long> {
    List<SeatEntity> findByFlight_Id(Long flightId);

}

