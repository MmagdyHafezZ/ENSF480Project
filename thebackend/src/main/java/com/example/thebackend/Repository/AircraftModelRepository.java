package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.AircraftModelEntity;

/**
 * AircraftModelRepository
 */
@Repository
public interface AircraftModelRepository extends JpaRepository<AircraftModelEntity, Long>{
    
}