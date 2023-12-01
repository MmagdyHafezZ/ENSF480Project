package com.example.thebackend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.thebackend.DTO.FlightListResponse;
import com.example.thebackend.Entity.FlightListEntity;

/**
 * FlightListRepository
 */
@Repository
public interface FlightListRepository extends JpaRepository<FlightListEntity, Long>{

    @Query("SELECT new com.example.thebackend.DTO.FlightListResponse(fl.id , sb.iataorigin , sb.iatadest, sb.departing, sb.returning) FROM FlightListEntity fl JOIN fl.searchBooking sb")
    public List<FlightListResponse> joinFlightBooking();
}