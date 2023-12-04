package com.example.thebackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.User;
import com.example.thebackend.Entity.UserProfile;
import com.example.thebackend.Repository.UserProfileRepository;
import com.example.thebackend.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import com.example.thebackend.DTO.UserProfileDTO;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    public UserProfile addOrUpdateUserProfile(UserProfileDTO dto) {
        long userId = dto.getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElse(new UserProfile());

        userProfile.setUsername(dto.getUsername());
        userProfile.setUserRole(dto.getUserRole());
        userProfile.setMembershipType(dto.getMembershipType());
        userProfile.setLoyaltyPoints(dto.getLoyaltyPoints());
        userProfile.setRecentBookings(dto.getRecentBookings());
        userProfile.setUpcomingFlights(dto.getUpcomingFlights());
        userProfile.setEmailNotification(dto.getEmailNotification());
        userProfile.setbalance(dto.getBalance());
        userProfile.setEmail(dto.getEmail());
        userProfile.setPhoneNumber(dto.getPhoneNumber());
        userProfile.setUser(user);

        return userProfileRepository.save(userProfile);
    }

    public void deleteUserProfile(Long id) {
        userProfileRepository.deleteById(id);
    }
    public UserProfileDTO getUserProfile(Long id) {
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User profile not found with id: " + id));
        
        // Convert UserProfile to UserProfileDTO (which should not include the entire User object)
        return convertToDTO(userProfile);
    }
    private UserProfileDTO convertToDTO(UserProfile userProfile) {
        // Create a new DTO and set only the necessary fields from userProfile
        // Avoid setting the entire User object
        UserProfileDTO dto = new UserProfileDTO();
        dto.setUsername(userProfile.getUsername());
        dto.setUserRole(userProfile.getUserRole());
        dto.setMembershipType(userProfile.getMembershipType());
        dto.setLoyaltyPoints(userProfile.getLoyaltyPoints());
        dto.setRecentBookings(userProfile.getRecentBookings());
        dto.setUpcomingFlights(userProfile.getUpcomingFlights());
        dto.setEmailNotification(userProfile.getEmailNotification());
        dto.setEmail(userProfile.getEmail());
        dto.setPhoneNumber(userProfile.getPhoneNumber());
        dto.setId(userProfile.getId());
        return dto;

    }


    public void addOrUpdateUserProfile(UserProfile userProfile) {
        userProfileRepository.save(userProfile);
    }
}
