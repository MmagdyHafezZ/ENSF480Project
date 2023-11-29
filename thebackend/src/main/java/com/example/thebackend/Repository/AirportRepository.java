package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.AirportEntity;

/**
 * AirportRepository
 */
@Repository
public interface AirportRepository extends JpaRepository<AirportEntity, String>{

}