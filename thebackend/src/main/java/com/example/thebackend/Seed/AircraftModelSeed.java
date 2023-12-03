package com.example.thebackend.Seed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import com.example.thebackend.Entity.AircraftModelEntity;
import com.example.thebackend.Repository.AircraftModelRepository;

/**
 * AircraftModelSeed
 */
@Component
public class AircraftModelSeed implements CommandLineRunner{

    @Autowired
    AircraftModelRepository aircraftModelRepository;

    @Autowired
    ApplicationEventPublisher eventPublisher;


    @Override
    public void run(String... args) throws Exception {
        loadAircraftModelData();
    }

    private void loadAircraftModelData() {
        if (aircraftModelRepository.count() == 0) {
            AircraftModelEntity a1 = new AircraftModelEntity("Embraer", "E175-E2", 90, 19, 4);
            AircraftModelEntity a2 = new AircraftModelEntity("Boeing", "737-8 MAX", 90, 28, 6);
            aircraftModelRepository.save(a1);
            aircraftModelRepository.save(a2);
            eventPublisher.publishEvent(new SeedingCompleteEvent(this));
        }
    }
    
}