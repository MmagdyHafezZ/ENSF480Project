package com.example.thebackend.Repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.PromoEntity;
import com.example.thebackend.Entity.User;

/**
 * PromoRepository
 */
@Repository
public interface PromoRepository extends JpaRepository<PromoEntity, Long>{

    // FK: user_id in promo table
    // PK: id in users table
    Optional<PromoEntity> findByUserid_Id(Long userid);

    List<PromoEntity> findByUserid(User userid);

    boolean existsByPromocode(String promocode);

    
}