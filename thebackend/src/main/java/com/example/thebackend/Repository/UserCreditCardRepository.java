package com.example.thebackend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.thebackend.Entity.UserCreditCard;
import java.util.Optional;

@Repository
public interface UserCreditCardRepository extends JpaRepository<UserCreditCard, Long> {
    Optional<UserCreditCard> findByUserId(Long userId);

}
