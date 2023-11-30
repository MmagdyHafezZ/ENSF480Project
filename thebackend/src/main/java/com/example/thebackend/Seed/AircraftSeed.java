package com.example.thebackend.Seed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.thebackend.Repository.AircraftRepository;

/**
 * AircraftSeed
 */
@Component
public class AircraftSeed implements CommandLineRunner{

    @Autowired
    AircraftRepository aircraftRepository;

    @Override
    public void run(String... args) throws Exception {
        loadAircraftData();
    }

    private void loadAircraftData() {
        if (aircraftRepository.count() == 0){
            AircraftEntity a1 = new AircraftEntity("E175-E2");
            AircraftEntity a2 = new AircraftEntity("737-8 MAX");
            aircraftRepository.save(a1);
            aircraftRepository.save(a2);
        }
    }
}