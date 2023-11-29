package com.example.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.Entity.ManageBookingEntity;

/**
 * ManageBookingRepository
 */
@Repository
public interface ManageBookingRepository extends JpaRepository<ManageBookingEntity, Long>{

}