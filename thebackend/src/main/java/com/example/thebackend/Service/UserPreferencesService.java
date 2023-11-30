package com.example.thebackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.thebackend.Entity.UserPreferences;
import com.example.thebackend.Entity.UserProfile;
import com.example.thebackend.Repository.UserPreferencesRepository;
import com.example.thebackend.Repository.UserProfileRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserPreferencesService {

    @Autowired
    private UserPreferencesRepository userPreferencesRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserPreferences addOrUpdateUserPreferences(Long id, String mealPreference, String seatPreference) {
        UserPreferences preferences = userPreferencesRepository.findById(id).orElse(new UserPreferences());

        preferences.setMealPreference(mealPreference);
        preferences.setSeatPreference(seatPreference);

        if (id != null) {
            UserProfile userProfile = userProfileRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("UserProfile not found with id " + id));
            preferences.setUserProfile(userProfile);
        } else {
            throw new IllegalArgumentException("UserProfile ID is required");
        }

        return userPreferencesRepository.save(preferences);
    }

    public void deleteUserPreferences(Long id) {
        userPreferencesRepository.deleteById(id);
    }
}
