package com.example.thebackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.thebackend.Entity.UserPreferences;
import com.example.thebackend.Repository.UserPreferencesRepository;
import com.example.thebackend.DTO.UserPreferencesDTO;

@Service
public class UserPreferencesService {

    @Autowired
    private UserPreferencesRepository userPreferencesRepository;

    public UserPreferences addOrUpdateUserPreferences(UserPreferencesDTO dto) {
        UserPreferences preferences = userPreferencesRepository.findById(dto.getId())
                .orElse(new UserPreferences());

        preferences.setMealPreference(dto.getMealPreference());
        preferences.setSeatPreference(dto.getSeatPreference());
        // preferences.setUserProfile(dto.getUserProfile());

        return userPreferencesRepository.save(preferences);
    }

    public void deleteUserPreferences(Long id) {
        userPreferencesRepository.deleteById(id);
    }
}
