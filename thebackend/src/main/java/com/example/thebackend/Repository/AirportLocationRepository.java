package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.AirportLocationEntity;

/**
 * AirportLocationRepository
 */
@Repository
public interface AirportLocationRepository extends JpaRepository<AirportLocationEntity, Long>{

    
}