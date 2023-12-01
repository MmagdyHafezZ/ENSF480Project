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
        userProfile.setUser(user);

        return userProfileRepository.save(userProfile);
    }

    public void deleteUserProfile(Long id) {
        userProfileRepository.deleteById(id);
    }
}
