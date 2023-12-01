package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.FlightListEntity;

/**
 * FlightListRepository
 */
@Repository
public interface FlightListRepository extends JpaRepository<FlightListEntity, Long>{

    
}