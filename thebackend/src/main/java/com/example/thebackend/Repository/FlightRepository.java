package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.FlightEntity;

/**
 * FlightRepository
 */
@Repository
public interface FlightRepository extends JpaRepository<FlightEntity, Long>{

}