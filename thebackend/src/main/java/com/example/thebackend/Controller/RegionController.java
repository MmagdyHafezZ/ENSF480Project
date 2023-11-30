package com.example.thebackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.thebackend.Entity.RegionEntity;
import com.example.thebackend.Service.RegionService;

/**
 * RegionController
 */
@RestController
public class RegionController {

    @Autowired
    private RegionService regionService;

    @GetMapping(params = "/getRegion")
    public List<RegionEntity> getRegion(){
        return regionService.getRegionData();
    }

    @GetMapping(path = "/getRegion/{id}")
    public RegionEntity getSingleRegion(@PathVariable Long id){
        return regionService.singleGet(id);
    }

    @PostMapping(path = "/postRegion")
    public RegionEntity postRegion(@RequestBody RegionEntity regionEntity){
        return regionService.postRegionEntity(regionEntity);
    }

    @PutMapping(path = "/putRegion/{id}")
    public RegionEntity putRegion(@PathVariable Long id, @RequestBody RegionEntity regionEntity){
        return regionService.updateRegionEntity(id, regionEntity);
    }

    @DeleteMapping(params = "/deleteRegion/{id}")
    public void deleteRegion(@PathVariable Long id){
        regionService.deleteRegionEntity(id);
    }
}