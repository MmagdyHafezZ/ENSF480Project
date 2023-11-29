package com.example.thebackend.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.UserPreferences;

@Service
public class UserPreferencesService {
    @Autowired
    private UserPreferences userPreferencesRepository;

    // Add methods for add, remove, edit
}