package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.Crew;

/**
 * CrewRepository
 */
@Repository
public interface CrewRepository extends JpaRepository<Crew, Long>{
}