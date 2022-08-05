import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Card } from '../interfaces/card';
import { Cards } from '../interfaces/cards';
import { HttpService } from './http.service';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsStackService implements OnInit {
  private leftCards: Card[] = [];
  private rightCards: Card[] = [];

  private usedCards: Card[] = [];
  private unusedCards: Card[] = [];

  private itIsLeftsTurn = true;
  private gameHasBeenStarted = false;

  constructor(private httpService: HttpService) {
    /*
    this.unusedCards.push(
      { id: 'a1', number: 1, letter: 'A' },
      { id: 'a2', number: 2, letter: 'A' },
      { id: 'a3', number: 3, letter: 'A' },
      { id: 'a4', number: 4, letter: 'A' },
      { id: 'a5', number: 5, letter: 'A' },
      { id: 'b1', number: 1, letter: 'B' },
      { id: 'b2', number: 2, letter: 'B' },
      { id: 'b3', number: 3, letter: 'B' },
      { id: 'b4', number: 4, letter: 'B' },
      { id: 'b5', number: 5, letter: 'B' },
      { id: 'c1', number: 1, letter: 'C' },
      { id: 'c2', number: 2, letter: 'C' },
      { id: 'c3', number: 3, letter: 'C' },
      { id: 'c4', number: 4, letter: 'C' },
      { id: 'c5', number: 5, letter: 'C' },
      { id: 'd1', number: 1, letter: 'D' },
      { id: 'd2', number: 2, letter: 'D' },
      { id: 'd3', number: 3, letter: 'D' },
      { id: 'd4', number: 4, letter: 'D' },
      { id: 'd5', number: 5, letter: 'D' }
    );
*/
  }

  ngOnInit(): void {}

  initializingFunction1() {
    this.getAllCardsFromServer();
  }

  initializingFunction2() {
    this.generateFirstTopCard();

    for (let i = 0; i < 5; i++) {
      this.setRandomCardsIntoLeftStack();
      this.setRandomCardsIntoRightStack();
    }
  }

  getAllCardsFromServer() {
    this.httpService.getAllCardsFromDatabase().subscribe(
      (response: Card[]) => {
        this.unusedCards = response;
        this.initializingFunction2();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  setItIsLeftsTurn(b: boolean) {
    this.itIsLeftsTurn = b;
  }

  getItIsLeftsTurn(): boolean {
    return this.itIsLeftsTurn;
  }

  addUsedCard(card: Card) {
    this.usedCards.push(card);
    this.unusedCards = this.unusedCards.filter((c) => c !== card);
  }

  getCardFromUnusedCards(): Card {
    let card =
      this.unusedCards[Math.floor(Math.random() * this.unusedCards.length)];
    this.unusedCards = this.unusedCards.filter((c) => c !== card);
    return card;
  }

  isUnusedCardsStackNotEmpty(): boolean {
    if (this.unusedCards.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  getCardsFromUsedStackToUnusedStack() {
    const removedCards: Card[] = [];
    for (var i = 0; i < this.usedCards.length - 1; i++) {
      var card = this.usedCards[i];
      this.unusedCards.push(card);
      removedCards.push(card);
    }
    for (var i = 0; i < removedCards.length; i++) {
      var card = removedCards[i];
      this.usedCards = this.usedCards.filter((c) => c !== card);
    }
  }

  getLastTopCard() {
    return this.usedCards[this.usedCards.length - 1];
  }

  generateFirstTopCard() {
    let card =
      this.unusedCards[Math.floor(Math.random() * this.unusedCards.length)];
    this.usedCards.push(card);
    this.unusedCards = this.unusedCards.filter((c) => c !== card);
  }

  setRandomCardsIntoLeftStack() {
    let card =
      this.unusedCards[Math.floor(Math.random() * this.unusedCards.length)];
    this.leftCards.push(card);
    this.unusedCards = this.unusedCards.filter((c) => c !== card);
  }

  setRandomCardsIntoRightStack() {
    let card =
      this.unusedCards[Math.floor(Math.random() * this.unusedCards.length)];
    this.rightCards.push(card);
    this.unusedCards = this.unusedCards.filter((c) => c !== card);
  }

  setLeftCardsStack(cards: Card[]) {
    this.leftCards = cards;
  }

  setRightCardsStack(cards: Card[]) {
    this.rightCards = cards;
  }

  getLeftCardsStack(): Card[] {
    return this.leftCards;
  }

  getRightCardsStack(): Card[] {
    return this.rightCards;
  }

  getUsedCards(): Card[] {
    return this.usedCards;
  }

  getUnusedCards(): Card[] {
    return this.unusedCards;
  }

  setGameHasBeenStarted(b: boolean) {
    this.gameHasBeenStarted = b;
  }

  getGameHasBeenStarted(): boolean {
    return this.gameHasBeenStarted;
  }

  clearLists() {
    this.leftCards = [];
    this.rightCards = [];
    this.usedCards = [];
    this.unusedCards = [];
    this.gameHasBeenStarted = false;
  }
}
