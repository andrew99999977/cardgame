package com.profect.cardgame.service;

import com.profect.cardgame.Card;
import com.profect.cardgame.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public Card addCard(Card card){
        return cardRepository.save(card);
    }

    public void deleteCard(String id){
        cardRepository.deleteById(id);
    }

    public List<Card> getAllCardsFromDB() {return cardRepository.findAll();}
}
