package com.example.thebackend.Service;

import java.util.List;

import javax.swing.plaf.synth.Region;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.RegionEntity;
import com.example.thebackend.Repository.RegionRepository;

/**
 * RegionService
 */
@Service
public class RegionService {

    @Autowired
    private RegionRepository regionRepository;

    // GET
    public List<RegionEntity> getRegionData(){
        return regionRepository.findAll();
    }

    // GET Single
    public RegionEntity singleGet(Long id){
        return regionRepository.findById(id).get();
    }

    // POST
    public RegionEntity postRegionEntity(RegionEntity regionEntity){
        return regionRepository.save(regionEntity);
    }

    // PUT
    public RegionEntity updateRegionEntity(Long id, RegionEntity existingdata){
        RegionEntity updateData = regionRepository.findById(id).get();
        updateData.setCity(existingdata.getCity());
        updateData.setState(existingdata.getState());
        updateData.setCountry(existingdata.getCountry());

        return regionRepository.save(updateData);
    }

    // DELETE
    public void deleteRegionEntity(Long id){
        regionRepository.deleteById(id);
    }
    
}