package com.example.thebackend.Service;

import com.example.thebackend.DTO.UserPreferencesDTO;
import com.example.thebackend.Entity.User;
import com.example.thebackend.Entity.UserPreferences;
import com.example.thebackend.Repository.UserPreferencesRepository;
import com.example.thebackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPreferencesService {

    @Autowired
    private UserPreferencesRepository userPreferencesRepository;

    @Autowired
    private UserRepository userRepository;

    public UserPreferences addOrUpdateUserPreferences(UserPreferencesDTO dto) {
        // Fetch the associated User
        Long userId = dto.getId(); // Assuming getId() returns the User ID
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Find existing UserPreferences for this User or create a new one
        UserPreferences preferences = userPreferencesRepository.findByUserId(userId)
            .orElse(new UserPreferences());

        preferences.setMealPreference(dto.getMealPreference());
        preferences.setSeatPreference(dto.getSeatPreference());
        preferences.setUser(user); // Set the user to the preferences

        // Save the UserPreferences
        return userPreferencesRepository.save(preferences);
    }

    public void deleteUserPreferences(Long id) {
        userPreferencesRepository.deleteById(id);
    }

    public UserPreferences getUserPreferences(Long id) {
        return userPreferencesRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User preferences not found with id: " + id));
    }
}

