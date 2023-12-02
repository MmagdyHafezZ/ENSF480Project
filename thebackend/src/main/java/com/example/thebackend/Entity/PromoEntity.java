package com.example.thebackend.Entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * PromoEntity
 */
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "promo")
public class PromoEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user_id;

    @Column(name = "promo_offer")
    private String promo_offer;

    @Column(name = "promo_code")
    private String promo_code;

    @Column(name = "discount")
    private Integer discount;

    @Column(name = "is_claim")
    private Integer is_claim = 0;

    public void setId(Long id){
        this.id = id;
    }

    public Long getId(){
        return id;
    }

    public void setUser_id(User user_id){
        this.user_id = user_id;
    }

    public User getUser_id(){
        return user_id;
    }

    public void setPromo_offer(String promo_offer){
        this.promo_offer = promo_offer;
    }

    public String getPromo_offer(){
        return promo_offer;
    }

    public void setPromo_code(String promo_code){
        this.promo_code = promo_code;
    }

    public String getPromo_code(){
        return promo_code;
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

}