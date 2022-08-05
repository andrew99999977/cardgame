package com.profect.cardgame.repository;

import com.profect.cardgame.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card,String> {
}
