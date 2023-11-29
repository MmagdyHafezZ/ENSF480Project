package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.ManageBookingEntity;

/**
 * ManageBookingRepository
 */
@Repository
public interface ManageBookingRepository extends JpaRepository<ManageBookingEntity, Long>{

}