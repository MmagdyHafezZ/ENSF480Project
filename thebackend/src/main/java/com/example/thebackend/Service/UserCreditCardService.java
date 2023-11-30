package com.example.thebackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.thebackend.Entity.UserCreditCard;
import com.example.thebackend.Repository.UserCreditCardRepository;
import com.example.thebackend.DTO.UserCreditCardDTO;

@Service
public class UserCreditCardService {

    @Autowired
    private UserCreditCardRepository userCreditCardRepository;

    public UserCreditCard addOrUpdateUserCreditCard(UserCreditCardDTO dto) {
        UserCreditCard creditCard = userCreditCardRepository.findById(dto.getId())
                .orElse(new UserCreditCard());

        creditCard.setCardNumber(dto.getCardNumber());
        creditCard.setExpiryDate(dto.getExpiryDate());
        creditCard.setCvv(dto.getCvv());
        creditCard.setCardholderName(dto.getCardholderName());
        creditCard.setAddress(dto.getAddress());
        // creditCard.setUserProfile(dto.getUserProfile());

        return userCreditCardRepository.save(creditCard);
    }

    public void deleteUserCreditCard(Long id) {
        userCreditCardRepository.deleteById(id);
    }
}
