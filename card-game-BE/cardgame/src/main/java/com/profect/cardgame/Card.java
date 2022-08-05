package com.profect.cardgame;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "card")
public class Card implements Serializable {

    @Id
    private String id;
    private Integer number;
    private String letter;

    public Card(String id, Integer number, String letter){
        this.id = id;
        this.number = number;
        this.letter = letter;
    }

    public Card(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }
}
