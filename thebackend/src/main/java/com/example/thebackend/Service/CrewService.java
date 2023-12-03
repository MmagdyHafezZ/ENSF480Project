package com.example.thebackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.Crew;
import com.example.thebackend.Repository.CrewRepository;

/**
 * CrewService
 */
@Service
public class CrewService {

    @Autowired
    private CrewRepository crewRepository;

    // GET
    public List<Crew> getCrewData() {
        return crewRepository.findAll();
    }

    // GET Single
    public Crew singleGet(Long id) {
        return crewRepository.findById(id).get();
    }

    // POST
    public Crew postCrew(Crew crew) {
        return crewRepository.save(crew);
    }

    // PUT
    public Crew updateCrew(Long id, Crew existingData) {
        Crew updateData = crewRepository.findById(id).get();
        updateData.setPilot(existingData.getPilot());
        updateData.setCopilot(existingData.getCopilot());
        updateData.setLeadFlightAttendant(existingData.getLeadFlightAttendant());
        updateData.setAssistantFlightAttendant(existingData.getAssistantFlightAttendant());

        return crewRepository.save(updateData);
    }

    // DELETE
    public void deleteCrew(Long id) {
        crewRepository.deleteById(id);
    }
}
