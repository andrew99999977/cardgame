import { Component, OnInit } from '@angular/core';
import { Card } from '../interfaces/card';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-cards-management',
  templateUrl: './cards-management.component.html',
  styleUrls: ['./cards-management.component.css'],
})
export class CardsManagementComponent implements OnInit {
  cards: Card[] = [];
  id: string;
  number: number;
  letter: string;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getAllCardsFromDB();
  }

  addACard(): void {
    const card: Card = {
      id: this.id,
      number: this.number,
      letter: this.letter,
    };
    this.httpService.addACard(card).subscribe(() => {
      this.getAllCardsFromDB();
    });
  }

  deleteThisCard(): void {
    const card: Card = {
      id: this.id,
      number: this.number,
      letter: this.letter,
    };
    this.httpService.deleteACard(card).subscribe(() => {
      this.getAllCardsFromDB();
    });
    this.id = '';
  }

  getAllCardsFromDB() {
    this.httpService.getAllCardsFromDatabase().subscribe((response: Card[]) => {
      this.cards = response;
    });
  }
}
