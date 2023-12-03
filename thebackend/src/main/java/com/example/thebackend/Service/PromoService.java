package com.example.thebackend.Service;

import java.util.stream.Collectors; 
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.thebackend.Configuration.StringGenConfiguration;
import com.example.thebackend.DTO.PromoDTO;
import com.example.thebackend.Entity.PromoEntity;
import com.example.thebackend.Entity.User;
import com.example.thebackend.Repository.PromoRepository;
import com.example.thebackend.Repository.UserRepository;


/**
 * PromoService
 */
@Service
public class PromoService {

    @Autowired
    private PromoRepository promoRepository;

    @Autowired
    private UserRepository userRepository;

    // GET
    public List<PromoEntity> getPromoData(){
        return promoRepository.findAll();
    }

    // GET 
    public List<PromoDTO> getPromoByUserid(Long userid) {
    User user = userRepository.findById(userid)
                              .orElseThrow(() -> new RuntimeException("User not found"));
    
    return promoRepository.findByUserid(user)
                          .stream()
                          .map(promo -> toPromoDTO(promo))
                          .collect(Collectors.toList());
}

    private PromoDTO toPromoDTO(PromoEntity promo) {
        return new PromoDTO(
            promo.getId(),
            promo.getPromo_offer(),
            promo.getPromocode(),
            promo.getDiscount(),
            promo.getIs_claim(),
            promo.getUser_id().getId()
        );
    }

    private String generateUniquePromoCode(int length) {
        String promocode;
        do {
            promocode = StringGenConfiguration.generateRandomAlphanumeric(length);
        } while (promoRepository.existsByPromocode(promocode));
        return promocode;
    }

    // POST
    public void postPromo (User user){

        String[] offers = new String[]{"Flight Deal", "Hotel Deal", "Last Minute Deal", "Group Discount", "Car Rental Deal", "Adventure Tour", "Cruise Offer", "City Pass", "All-Inclusive Pass"};

        for(int i = 0; i < offers.length; i++){
            PromoEntity promo = new PromoEntity();

            promo.setUser_id(user);
            promo.setPromo_offer(offers[i]);
            promo.setPromocode(generateUniquePromoCode(5));

            Integer discount = new Random().nextInt(51);
            promo.setDiscount(discount);
            promoRepository.save(promo);
        }
    }


}
