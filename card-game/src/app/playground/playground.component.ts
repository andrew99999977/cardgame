import { Component, OnInit } from '@angular/core';
import { Card } from '../interfaces/card';
import { CardsStackService } from '../services/cards-stack.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  cardsStack: Card[] = [];

  topCard: Card = { id: 'a3', number: 3, letter: 'A' };

  moveHasBeenMade = false;
  stackIsVisible = true;
  isCurrentPlayerLeft = true;
  isDrawingAnotherCardPossible = true;
  gameHasBeenStarted = false;

  endgameMessage: string = '';
  currentPlayerString: string = '';

  constructor(private cardsStackService: CardsStackService) {}

  ngOnInit(): void {
    if (this.cardsStackService.getGameHasBeenStarted()) {
      this.gameHasBeenStarted = true;
      this.startGame();
    }
  }

  async startGame(): Promise<void> {
    if (!this.cardsStackService.getGameHasBeenStarted()) {
      this.cardsStackService.getAllCardsFromServer();
      await this.delay(20);
    }
    this.isCurrentPlayerLeft = this.cardsStackService.getItIsLeftsTurn();
    if (this.isCurrentPlayerLeft) {
      this.currentPlayerString = 'Player 1';
    } else {
      this.currentPlayerString = 'Player 2';
    }
    this.getDataIntoCardStack();
    this.gameHasBeenStarted = true;
    this.cardsStackService.setGameHasBeenStarted(true);
  }

  getDataIntoCardStack() {
    if (this.isCurrentPlayerLeft) {
      this.cardsStack = this.cardsStackService.getLeftCardsStack();
    } else {
      this.cardsStack = this.cardsStackService.getRightCardsStack();
    }
    this.topCard = this.cardsStackService.getLastTopCard();
  }

  getAnotherCard() {
    this.cardsStack.push(this.cardsStackService.getCardFromUnusedCards());
    /*
    this.isDrawingAnotherCardPossible =
      this.cardsStackService.isUnusedCardsStackNotEmpty();
    if (!this.isDrawingAnotherCardPossible) {
      this.cardsStackService.getCardsFromUsedStackToUnusedStack();
    }
    */
    this.moveIsDone();
  }

  async moveIsDone(): Promise<void> {
    this.moveHasBeenMade = false;
    this.stackIsVisible = false;
    await this.delay(100);

    if (this.isCurrentPlayerLeft) {
      this.cardsStackService.setLeftCardsStack(this.cardsStack);
      this.cardsStack = this.cardsStackService.getRightCardsStack();
      this.isCurrentPlayerLeft = false;
      this.cardsStackService.setItIsLeftsTurn(false);
      this.currentPlayerString = 'Player 2';
    } else {
      this.cardsStackService.setRightCardsStack(this.cardsStack);
      this.cardsStack = this.cardsStackService.getLeftCardsStack();
      this.isCurrentPlayerLeft = true;
      this.cardsStackService.setItIsLeftsTurn(true);
      this.currentPlayerString = 'Player 1';
    }

    this.isDrawingAnotherCardPossible =
      this.cardsStackService.isUnusedCardsStackNotEmpty();
    if (!this.isDrawingAnotherCardPossible) {
      this.cardsStackService.getCardsFromUsedStackToUnusedStack();
      this.isDrawingAnotherCardPossible =
        this.cardsStackService.isUnusedCardsStackNotEmpty();
    }

    this.stackIsVisible = true;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  setTopCard(card: Card) {
    if (this.isCurrentPlayerLeft) {
      this.setTopCardLeft(card);
    } else {
      this.setTopCardRight(card);
    }
  }

  setTopCardRight(clickedCard: Card) {
    if (this.moveHasBeenMade) {
      if (clickedCard.number === this.topCard.number) {
        this.setTopCardRightReally(clickedCard);
      }
    } else {
      if (
        clickedCard.number === this.topCard.number ||
        clickedCard.letter === this.topCard.letter
      ) {
        this.moveHasBeenMade = true;
        this.setTopCardRightReally(clickedCard);
      }
    }
  }

  setTopCardRightReally(clickedCard: Card) {
    this.topCard = clickedCard;
    this.cardsStackService.addUsedCard(clickedCard);
    this.cardsStackService.setRightCardsStack(this.cardsStack);
    this.cardsStack = this.cardsStack.filter((card) => card !== clickedCard);
    this.endGame();
  }

  setTopCardLeft(clickedCard: Card) {
    if (this.moveHasBeenMade) {
      if (clickedCard.number === this.topCard.number) {
        this.setTopCardLeftReally(clickedCard);
      }
    } else {
      if (
        clickedCard.number === this.topCard.number ||
        clickedCard.letter === this.topCard.letter
      ) {
        this.moveHasBeenMade = true;
        this.setTopCardLeftReally(clickedCard);
      }
    }
  }

  setTopCardLeftReally(clickedCard: Card) {
    this.topCard = clickedCard;
    this.cardsStackService.addUsedCard(clickedCard);
    this.cardsStack = this.cardsStack.filter((card) => card !== clickedCard);
    this.cardsStackService.setLeftCardsStack(this.cardsStack);
    this.endGame();
  }

  async endGame() {
    if (this.cardsStack.length === 0) {
      this.currentPlayerString = this.currentPlayerString + ' has won!!!';
      await this.delay(3000);
      this.gameHasBeenStarted = false;
      this.cardsStackService.clearLists();
    }
  }

  afterOneOfThePlayersHasWon() {}
}
