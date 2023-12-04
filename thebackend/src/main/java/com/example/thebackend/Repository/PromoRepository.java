package com.example.thebackend.Repository;

import java.util.Optional;
import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.thebackend.Entity.PromoEntity;
import com.example.thebackend.Entity.User;

/**
 * PromoRepository
 */
@Repository
public interface PromoRepository extends JpaRepository<PromoEntity, Long> {
    Optional<PromoEntity> findByPromocode(String promocode);

    boolean existsByPromocode(String promocode);

    Collection<PromoEntity> findByUseridId(Long userId); // Note the change in method name

    Collection<PromoEntity> findByUserid(User user);


    
}