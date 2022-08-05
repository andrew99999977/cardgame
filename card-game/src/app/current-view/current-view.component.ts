import { Component, OnInit } from '@angular/core';
import { Card } from '../interfaces/card';
import { CardsStackService } from '../services/cards-stack.service';

@Component({
  selector: 'app-current-view',
  templateUrl: './current-view.component.html',
  styleUrls: ['./current-view.component.css'],
})
export class CurrentViewComponent implements OnInit {
  leftCards: Card[] = [];
  rightCards: Card[] = [];

  unusedCards: Card[] = [];
  usedCards: Card[] = [];

  constructor(private cardsStackService: CardsStackService) {}

  ngOnInit(): void {
    this.leftCards = this.cardsStackService.getLeftCardsStack();
    this.rightCards = this.cardsStackService.getRightCardsStack();

    this.unusedCards = this.cardsStackService.getUnusedCards();
    this.usedCards = this.cardsStackService.getUsedCards();
  }
}
