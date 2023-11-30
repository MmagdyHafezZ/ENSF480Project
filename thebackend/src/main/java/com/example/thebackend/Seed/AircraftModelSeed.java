package com.example.thebackend.Seed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
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

    @Override
    public void run(String... args) throws Exception {
        loadAircraftModelData();
    }

    private void loadAircraftModelData() {
        if (aircraftModelRepository.count() == 0) {
            AircraftModelEntity a1 = new AircraftModelEntity("Embraer", 90, 19, 4);
            AircraftModelEntity a2 = new AircraftModelEntity("Boeing", 90, 28, 6);
            aircraftModelRepository.save(a1);
            aircraftModelRepository.save(a2);
        }
    }
}