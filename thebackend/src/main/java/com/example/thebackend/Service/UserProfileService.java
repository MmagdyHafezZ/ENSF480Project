package com.example.thebackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.UserProfile;

@Service
public class UserProfileService {
    @Autowired
    private UserProfile userProfileRepository;

    // Add methods for add, remove, edit
}
