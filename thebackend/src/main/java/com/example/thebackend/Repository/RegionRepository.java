package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.RegionEntity;

/**
 * RegionRepository
 */
@Repository
public interface RegionRepository extends JpaRepository<RegionEntity, Long>{

    
}