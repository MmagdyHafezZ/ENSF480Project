package com.example.thebackend.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.thebackend.Entity.UserCreditCard;
import com.example.thebackend.Repository.UserCreditCardRepository;
import com.example.thebackend.DTO.UserCreditCardDTO;

@Service
public class UserCreditCardService {

    @Autowired
    private UserCreditCardRepository userCreditCardRepository;


    @Transactional
    public UserCreditCard addOrUpdateUserCreditCard(UserCreditCardDTO dto) {
        long userId = dto.getId();

        UserCreditCard creditCard = userCreditCardRepository.findByUserId(userId)
                .orElse(new UserCreditCard());

        // Set credit card details from DTO
        creditCard.setCardNumber(dto.getCardNumber());
        creditCard.setExpiryDate(dto.getExpiryDate());
        creditCard.setCvv(dto.getCvv());
        creditCard.setCardholderName(dto.getCardholderName());
        creditCard.setAddress(dto.getAddress());

        // Save the UserCreditCard
        return userCreditCardRepository.save(creditCard);
    }

    public void deleteUserCreditCard(Long id) {
        userCreditCardRepository.deleteById(id);
    }
}
