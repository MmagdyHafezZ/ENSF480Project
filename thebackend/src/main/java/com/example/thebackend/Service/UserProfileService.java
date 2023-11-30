package com.example.thebackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.thebackend.Entity.UserProfile;
import com.example.thebackend.Repository.UserProfileRepository;
import com.example.thebackend.DTO.UserProfileDTO;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserProfile addOrUpdateUserProfile(UserProfileDTO dto) {
        UserProfile userProfile = userProfileRepository.findById(dto.getId())
                .orElse(new UserProfile());

        userProfile.setUsername(dto.getUsername());
        userProfile.setUserRole(dto.getUserRole());
        userProfile.setMembershipType(dto.getMembershipType());
        userProfile.setLoyaltyPoints(dto.getLoyaltyPoints());
        userProfile.setRecentBookings(dto.getRecentBookings());
        userProfile.setUpcomingFlights(dto.getUpcomingFlights());
        userProfile.setEmailNotification(dto.getEmailNotification());

        return userProfileRepository.save(userProfile);
    }

    public void deleteUserProfile(Long id) {
        userProfileRepository.deleteById(id);
    }
}
