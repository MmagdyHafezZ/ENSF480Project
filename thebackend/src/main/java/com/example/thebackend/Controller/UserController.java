package com.example.thebackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.thebackend.DTO.UserProfileDTO;
import com.example.thebackend.Entity.UserProfile;
import com.example.thebackend.DTO.UserCreditCardDTO;
import com.example.thebackend.DTO.UserPreferencesDTO;
import com.example.thebackend.Service.UserProfileService;
import com.example.thebackend.Service.UserCreditCardService;
import com.example.thebackend.Service.UserPreferencesService;
import com.example.thebackend.Entity.UserCreditCard;
import com.example.thebackend.Entity.UserPreferences;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private UserCreditCardService userCreditCardService;

    @Autowired
    private UserPreferencesService userPreferencesService;

    // Add/Edit UserProfile
    @PostMapping("/profile")
    public ResponseEntity<?> addOrUpdateUserProfile(@RequestBody UserProfileDTO userProfileDTO) {
        UserProfile updatedProfile = userProfileService.addOrUpdateUserProfile(userProfileDTO);
        return ResponseEntity.ok(updatedProfile);
    }

    // Delete UserProfile
    @DeleteMapping("/profile/{id}")
    public ResponseEntity<?> deleteUserProfile(@PathVariable Long id) {
        userProfileService.deleteUserProfile(id);
        return ResponseEntity.ok("User profile deleted");
    }

    // Add/Edit UserCreditCard
    @PostMapping("/creditcard")
    public ResponseEntity<?> addOrUpdateUserCreditCard(@RequestBody UserCreditCardDTO creditCardDTO) {
        UserCreditCard updatedCreditCard = userCreditCardService.addOrUpdateUserCreditCard(creditCardDTO);
        return ResponseEntity.ok(updatedCreditCard);
        
    }

    // Delete UserCreditCard
    @DeleteMapping("/creditcard/{id}")
    public ResponseEntity<?> deleteUserCreditCard(@PathVariable Long id) {
        userCreditCardService.deleteUserCreditCard(id);
        return ResponseEntity.ok("Credit card deleted");
    }

    // Add/Edit UserPreferences
    @PostMapping("/preferences")
    public ResponseEntity<?> addOrUpdateUserPreferences(@RequestBody UserPreferencesDTO preferencesDTO) {
        UserPreferences updatedPreferences = userPreferencesService.addOrUpdateUserPreferences(preferencesDTO);
        return ResponseEntity.ok(updatedPreferences);
    }

    // Delete UserPreferences
    @DeleteMapping("/preferences/{id}")
    public ResponseEntity<?> deleteUserPreferences(@PathVariable Long id) {
        userPreferencesService.deleteUserPreferences(id);
        return ResponseEntity.ok("Preferences deleted");
    }
}
