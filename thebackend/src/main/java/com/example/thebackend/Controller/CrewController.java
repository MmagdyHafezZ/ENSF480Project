package com.example.thebackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.thebackend.Entity.Crew;
import com.example.thebackend.Service.CrewService;

/**
 * CrewController
 */
@RestController
public class CrewController {

    @Autowired
    private CrewService crewService;

    @GetMapping(path = "/getCrew")
    public List<Crew> getCrew() {
        return crewService.getCrewData();
    }

    @GetMapping(path = "/getCrew/{id}")
    public Crew getSingleCrew(@PathVariable Long id) {
        return crewService.singleGet(id);
    }

    @PostMapping(path = "/postCrew")
    public Crew postCrew(@RequestBody Crew crew) {
        return crewService.postCrew(crew);
    }

    @DeleteMapping(path = "/deleteCrew/{id}")
    public void deleteCrew(@PathVariable Long id) {
        crewService.deleteCrew(id);
    }
}
