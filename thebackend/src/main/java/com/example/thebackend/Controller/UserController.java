package com.example.thebackend.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.thebackend.Entity.UserProfile;
import com.example.thebackend.Service.UserCreditCardService;
import com.example.thebackend.Service.UserPreferencesService;
import com.example.thebackend.Service.UserProfileService;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private UserCreditCardService userCreditCardService;

    @Autowired
    private UserPreferencesService userPreferencesService;

    // Endpoint to add/edit user profile
    @PostMapping("/profile")
    public ResponseEntity<?> addOrUpdateUserProfile(@RequestBody UserProfile userProfile) {
        // Call service method
        return ResponseEntity.ok().body("Profile updated");
    }

    // Similar endpoints for userCreditCard and userPreferences
    // Endpoint to get user profile, credit card details, preferences
    // Endpoint to delete user profile, credit card details, preferences
}
