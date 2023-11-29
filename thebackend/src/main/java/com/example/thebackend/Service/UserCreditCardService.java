package com.example.thebackend.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.UserCreditCard;

@Service
public class UserCreditCardService {
    @Autowired
    private UserCreditCard userCreditCardRepository;

    // Add methods for add, remove, edit
}