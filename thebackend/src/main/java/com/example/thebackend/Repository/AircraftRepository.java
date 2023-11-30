package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.AircraftEntity;

/**
 * AircraftRepository
 */
@Repository
public interface AircraftRepository extends JpaRepository<AircraftEntity, Long>{

    
}