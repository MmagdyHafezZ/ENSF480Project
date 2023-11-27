package com.example.accessingdatamysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


/**
 * MainController
 */
@Controller
@RequestMapping(path = "/backend")
public class MainController {
    @Autowired
    private AirportDataRepository airportDataRepository;
    
    @PostMapping(path = "/add")
    public @ResponseBody String addNewIATA(@RequestParam String iata, @RequestParam String city, @RequestParam String state, @RequestParam String country) {

        AirportData d = new AirportData();
        d.setIATA(iata);
        d.setCity(city);
        d.setState(state);
        d.setCountry(country);

        airportDataRepository.save(d);

        return "Saved";
    }
    
    @GetMapping(path = "/all")
    public @ResponseBody Iterable<AirportData> getAllAirportData(){
        return airportDataRepository.findAll();
    }
    
}