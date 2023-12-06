package com.example.thebackend.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.thebackend.Entity.User;
import com.example.thebackend.Entity.UserCreditCard;
import com.example.thebackend.Repository.UserCreditCardRepository;
import com.example.thebackend.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import com.example.thebackend.DTO.UserCreditCardDTO;

@Service
public class UserCreditCardService {

    @Autowired
    private UserCreditCardRepository userCreditCardRepository;

    @Autowired
    private UserRepository userRepository;



    @Transactional
    public UserCreditCard addOrUpdateUserCreditCard(UserCreditCardDTO dto) {
        long id = dto.getId();

        UserCreditCard creditCard = userCreditCardRepository.findById(id)
                .orElse(new UserCreditCard());

        // Set credit card details from DTO
        creditCard.setCardNumber(dto.getCardNumber());
        creditCard.setExpiryDate(dto.getExpiryDate());
        creditCard.setCvv(dto.getCvv());
        creditCard.setCardholderName(dto.getCardholderName());
        creditCard.setAddress(dto.getAddress());

        // Retrieve and set the associated User
        User user = userRepository.findById(dto.getId()) // Assuming you have userId in your DTO
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        creditCard.setUser(user);

        // Save the UserCreditCard
        return userCreditCardRepository.save(creditCard);
    }


    public void deleteUserCreditCard(Long id) {
        userCreditCardRepository.deleteById(id);
    }


    public UserCreditCard getUserCreditCard(Long id) {
        return userCreditCardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("UserCreditCard not found"));
    }
}
