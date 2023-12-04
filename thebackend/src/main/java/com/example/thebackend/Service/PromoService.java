package com.example.thebackend.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Configuration.StringGenConfiguration;
import com.example.thebackend.DTO.PromoDTO;
import com.example.thebackend.Entity.PromoEntity;
import com.example.thebackend.Entity.User;
import com.example.thebackend.Repository.PromoRepository;
import com.example.thebackend.Repository.UserRepository;
import java.util.Optional;

@Service
public class PromoService {

    @Autowired
    private PromoRepository promoRepository;

    @Autowired
    private UserRepository userRepository;

    // GET all promos
    public List<PromoEntity> getPromoData() {
        // Assuming that PromoEntity does not cause infinite recursion
        return promoRepository.findAll();
    }

    // GET promos by user ID
   
    // Convert PromoEntity to PromoDTO
    private PromoDTO toPromoDTO(PromoEntity promo) {
        return new PromoDTO(
            promo.getId(),
            promo.getPromo_offer(),
            promo.getPromocode(),
            promo.getDiscount(),
            promo.getIs_claim(),
            promo.getUser_id().getId() // Only user ID to avoid recursion
        );
    }

    // Generate unique promo code
    private String generateUniquePromoCode(int length) {
        String promocode;
        do {
            promocode = StringGenConfiguration.generateRandomAlphanumeric(length);
        } while (promoRepository.existsByPromocode(promocode));
        return promocode;
    }

    // POST a new promo
    public void postPromo(Long userid) {
        User user = userRepository.findById(userid)
                                  .orElseThrow(() -> new RuntimeException("User not found"));
        String[] offers = {"Flight Deal", "Hotel Deal", "Last Minute Deal", "Group Discount", "Car Rental Deal", "Adventure Tour", "Cruise Offer", "City Pass", "All-Inclusive Pass"};

        for (String offer : offers) {
            PromoEntity promo = new PromoEntity();
            promo.setUser_id(user);
            promo.setPromo_offer(offer);
            promo.setPromocode(generateUniquePromoCode(5));
            promo.setDiscount(new Random().nextInt(51));
            promoRepository.save(promo);
        }
    }
    public Integer getDiscountByPromoCode(String promoCode) {
        Optional<PromoEntity> promo = promoRepository.findByPromocode(promoCode);

        if (!promo.isPresent() || promo.get().getIs_claim() != 0) {
            // Handle the case where the promo code is not found or already claimed
            throw new RuntimeException("Promo code not found or already claimed.");
        }

        return promo.get().getDiscount();
    }

 public List<PromoDTO> getPromoByUserid(Long userid) {
    User user = userRepository.findById(userid)
                              .orElseThrow(() -> new RuntimeException("User not found"));
    
    return promoRepository.findByUserid(user)
                          .stream()
                          .map(promo -> toPromoDTO(promo))
                          .collect(Collectors.toList());
}
    
}
