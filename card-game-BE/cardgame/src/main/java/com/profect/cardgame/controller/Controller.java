package com.profect.cardgame.controller;

import com.profect.cardgame.Card;
import com.profect.cardgame.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class Controller {

    private List<Card> listOfCards = new ArrayList<>();

    @Autowired
    private CardService cardService;

    Controller(){
        listOfCards.add(new Card("a1",1,"A"));
        listOfCards.add(new Card("a2",2,"A"));
        listOfCards.add(new Card("a3",3,"A"));
        listOfCards.add(new Card("a4",4,"A"));
        listOfCards.add(new Card("a5",5,"A"));

        listOfCards.add(new Card("b1",1,"B"));
        listOfCards.add(new Card("b2",2,"B"));
        listOfCards.add(new Card("b3",3,"B"));
        listOfCards.add(new Card("b4",4,"B"));
        listOfCards.add(new Card("b5",5,"B"));

        listOfCards.add(new Card("c1",1,"C"));
        listOfCards.add(new Card("c2",2,"C"));
        listOfCards.add(new Card("c3",3,"C"));
        listOfCards.add(new Card("c4",4,"C"));
        listOfCards.add(new Card("c5",5,"C"));

        listOfCards.add(new Card("d1",1,"D"));
        listOfCards.add(new Card("d2",2,"D"));
        listOfCards.add(new Card("d3",3,"D"));
        listOfCards.add(new Card("d4",4,"D"));
        listOfCards.add(new Card("d5",5,"D"));
    }

    @CrossOrigin
    @GetMapping("/allcards")
    public ResponseEntity<List<Card>> getAllCards(){
        return new ResponseEntity<>(listOfCards, HttpStatus.OK);
    };

    @CrossOrigin
    @GetMapping("/getcardsfromdb")
    public ResponseEntity<List<Card>> getAllCardsFromDB(){
        return new ResponseEntity<>(cardService.getAllCardsFromDB(), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/addcard")
    public ResponseEntity<Card> addACard(@RequestBody Card card){
        return new ResponseEntity<>(cardService.addCard(card), HttpStatus.OK);
    };

    @CrossOrigin
    @DeleteMapping("/deletecard/{id}")
    public ResponseEntity<?> deleteACard(@PathVariable("id") String id){
        cardService.deleteCard(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
