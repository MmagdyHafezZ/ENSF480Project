package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.SearchBookingEntity;

/**
 * SearchBookingRepository
 */
@Repository
public interface SearchBookingRepository extends JpaRepository<SearchBookingEntity, Long>{

    
}