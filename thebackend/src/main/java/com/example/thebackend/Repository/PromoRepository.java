package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.PromoEntity;

/**
 * PromoRepository
 */
@Repository
public interface PromoRepository extends JpaRepository<PromoEntity, Long>{

    
}