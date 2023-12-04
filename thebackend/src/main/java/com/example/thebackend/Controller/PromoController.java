package com.example.thebackend.Controller;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.thebackend.DTO.PromoDTO;
import com.example.thebackend.Service.PromoService;

/**
 * PromoController
 */
@RestController
public class PromoController {

    @Autowired
    private PromoService promoService;

    @PostMapping(path = "/postPromo")
    public void postPromo(@RequestBody Long userId){
        promoService.postPromo(userId);
    }

    @GetMapping(path = "/getPromo/{userid}")
    public ResponseEntity<List<PromoDTO>> getPromoByUserid(@PathVariable Long userid){
        List<PromoDTO> promo = promoService.getPromoByUserid(userid);

        return ResponseEntity.ok(promo);
    }
    @GetMapping("/getDiscount/{promoCode}")
    public ResponseEntity<?> getDiscount(@PathVariable String promoCode) {
        try {
            Integer discount = promoService.getDiscountByPromoCode(promoCode);
            return ResponseEntity.ok(discount);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body(e.getMessage());
        }
    }
    
}