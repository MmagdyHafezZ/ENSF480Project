package com.example.thebackend.DTO;


/**
 * PromoDTO
 */

public class PromoDTO {

    private Long id;
    private String promo_offer;
    private String promocode;
    private Integer discount;
    private Integer is_claim;
    private Long userid;

    public PromoDTO(Long id, String promo_offer, String promocode, Integer discount, Integer is_claim, Long userid){
        this.id = id;
        this.promo_offer = promo_offer;
        this.promocode = promocode;
        this.discount = discount;
        this.is_claim = is_claim;
        this.userid = userid;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setPromo_offer(String promo_offer){
        this.promo_offer = promo_offer;
    }

    public String getPromo_offer(){
        return promo_offer;
    }

    public void setPromocode(String promocode){
        this.promocode = promocode;
    }

    public String getPromocode(){
        return promocode;
    }

    public void setDiscount(Integer discount){
        this.discount = discount;
    }

    public Integer getDiscount(){
        return discount;
    }

    public void setIs_claim(Integer is_claim){
        this.is_claim = is_claim;
    }

    public Integer getIs_claim(){
        return is_claim;
    }

    public void setUserid(Long userid){
        this.userid = userid;
    }

    public Long getUserid(){
        return userid;
    }
    
}