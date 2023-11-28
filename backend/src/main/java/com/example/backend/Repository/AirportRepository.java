package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.AirportEntity;

/**
 * AirportRepository
 */
public interface AirportRepository extends JpaRepository<AirportEntity, String>{

}