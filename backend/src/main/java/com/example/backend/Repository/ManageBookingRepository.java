package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.ManageBookingEntity;

/**
 * ManageBookingRepository
 */
public interface ManageBookingRepository extends JpaRepository<ManageBookingEntity, Integer>{

}