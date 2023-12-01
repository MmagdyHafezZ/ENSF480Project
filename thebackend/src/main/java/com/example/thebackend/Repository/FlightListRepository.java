package com.example.thebackend.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.FlightListEntity;

/**
 * FlightListRepository
 */
@Repository
public interface FlightListRepository extends JpaRepository<FlightListEntity, Long>{

    // FK: searchbookingid in flightlist table
    // PK: id in searchbooking table
    Optional<FlightListEntity> findBySearchbookingid_Id(Long searchbookingid);
}