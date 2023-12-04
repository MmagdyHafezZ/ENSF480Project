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
        Long userId = dto.getId();
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Retrieve existing UserPreferences or create new if not exist
        UserPreferences preferences = userPreferencesRepository.findByUserId(userId)
            .orElse(new UserPreferences());

        // Update preferences with DTO values
        preferences.setMealPreference(dto.getMealPreference());
        preferences.setSeatPreference(dto.getSeatPreference());

        // Link the preferences with the user
        preferences.setUser(user);

        // Save the updated preferences
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

