package com.example.thebackend.Controller;

import org.apache.http.HttpStatus;
// import org.aspectj.weaver.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.thebackend.DTO.UserProfileDTO;
import com.example.thebackend.Entity.UserProfile;
import com.example.thebackend.DTO.BalanceDTO;
import com.example.thebackend.DTO.MembershipDTO;
import com.example.thebackend.DTO.UserCreditCardDTO;
import com.example.thebackend.DTO.UserPreferencesDTO;
import com.example.thebackend.Service.UserProfileService;
import com.example.thebackend.Service.FlightService;
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
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        UserProfileDTO userProfile = userProfileService.getUserProfile(id);
        return ResponseEntity.ok(userProfile);
    }

    // Add/Edit UserCreditCard
    @PostMapping("/creditcard")
    public ResponseEntity<?> addOrUpdateUserCreditCard(@RequestBody UserCreditCardDTO creditCardDTO) {
        UserCreditCard updatedCreditCard = userCreditCardService.addOrUpdateUserCreditCard(creditCardDTO);
        return ResponseEntity.ok(updatedCreditCard);
        
    }
    @GetMapping("/creditcard/{id}")
    public ResponseEntity<?> getUserCreditCard(@PathVariable Long id) {
        UserCreditCard userCreditCard = userCreditCardService.getUserCreditCard(id);
        return ResponseEntity.ok(userCreditCard);
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

    @GetMapping("/preferences/{id}")
    public ResponseEntity<?> getUserPreferences(@PathVariable Long id) {
        UserPreferences userPreferences = userPreferencesService.getUserPreferences(id);
        return ResponseEntity.ok(userPreferences);
    }

    // Delete UserPreferences
    @DeleteMapping("/preferences/{id}")
    public ResponseEntity<?> deleteUserPreferences(@PathVariable Long id) {
        userPreferencesService.deleteUserPreferences(id);
        return ResponseEntity.ok("Preferences deleted");
    }

    @GetMapping("/GetBalance/{id}")
    public ResponseEntity<?> getBalance(@PathVariable Long id) {
        UserProfileDTO userProfile = userProfileService.getUserProfile(id);
        return ResponseEntity.ok(userProfile.getBalance());
    }
    @PostMapping("/SetBalance/{id}")
    public ResponseEntity<?> setBalance(@PathVariable Long id, @RequestBody BalanceDTO balanceDto) {
        UserProfileDTO userProfile = userProfileService.getUserProfile(id);
        userProfile.setBalance(balanceDto.getBalance());
        userProfileService.addOrUpdateUserProfile(userProfile);
        return ResponseEntity.ok(userProfile.getBalance());
    }
    @PutMapping("/UpdateMembership/{id}")
    public ResponseEntity<?> updateMembership(@PathVariable Long id, @RequestBody MembershipDTO membershipDto) {
        UserProfileDTO userProfile = userProfileService.getUserProfile(id);
        userProfile.setMembershipType(membershipDto.getMembershipType());
        userProfileService.addOrUpdateUserProfile(userProfile);
        return ResponseEntity.ok(userProfile.getMembershipType());
    }
    @GetMapping("/GetMembership/{id}")
    public ResponseEntity<?> getMembership(@PathVariable Long id) {
        UserProfileDTO userProfile = userProfileService.getUserProfile(id);
        return ResponseEntity.ok(userProfile.getMembershipType());
    }

    @GetMapping("/getUpcomingFlights/{id}")
    public ResponseEntity<?> getUpcomingFlights(@PathVariable Long id) {
        UserProfileDTO userProfile = userProfileService.getUserProfile(id);
        return ResponseEntity.ok(userProfile.getUpcomingFlights());
    }
    @PutMapping("/addUpcomingFlight/{id}/{flightId}")
    public ResponseEntity<?> addUpcomingFlight(@PathVariable Long id, @PathVariable Long flightId) {
        UserProfileDTO userProfile = userProfileService.getUserProfile(id);
        userProfile.addUpcomingFlight(flightId);
        userProfileService.addOrUpdateUserProfile(userProfile);
        return ResponseEntity.ok(userProfile.getUpcomingFlights());

    }
    @DeleteMapping("/deleteUpcomingFlight/{id}/{flightId}")
    public ResponseEntity<?> deleteUpcomingFlight(@PathVariable Long id, @PathVariable Long flightId) {
        UserProfileDTO userProfile = userProfileService.getUserProfile(id);
        userProfile.deleteUpcomingFlight(flightId);
        userProfileService.addOrUpdateUserProfile(userProfile);
        return ResponseEntity.ok(userProfile.getUpcomingFlights());
    }
    
    
}
