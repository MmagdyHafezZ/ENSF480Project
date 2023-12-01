package com.example.thebackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Entity.User;
import com.example.thebackend.Entity.UserCreditCard;
import com.example.thebackend.Repository.UserCreditCardRepository;
import com.example.thebackend.Repository.UserRepository;
import com.example.thebackend.DTO.UserCreditCardDTO;

@Service
public class UserCreditCardService {

    @Autowired
    private UserCreditCardRepository userCreditCardRepository;

    @Autowired
    private UserRepository userRepository;

    public UserCreditCard addOrUpdateUserCreditCard(UserCreditCardDTO dto) {
        // Fetch the associated User using userId from DTO
        Long userId = dto.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Find existing UserCreditCard for this User or create a new one
        UserCreditCard creditCard = userCreditCardRepository.findByUserId(userId)
                .orElse(new UserCreditCard());

        // Set credit card details from DTO
        creditCard.setCardNumber(dto.getCardNumber());
        creditCard.setExpiryDate(dto.getExpiryDate());
        creditCard.setCvv(dto.getCvv());
        creditCard.setCardholderName(dto.getCardholderName());
        creditCard.setAddress(dto.getAddress());
        creditCard.setUser(user);

        // Save the UserCreditCard
        return userCreditCardRepository.save(creditCard);
    }

    public void deleteUserCreditCard(Long id) {
        userCreditCardRepository.deleteById(id);
    }
}
