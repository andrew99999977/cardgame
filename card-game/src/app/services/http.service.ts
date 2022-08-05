import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private serverUrl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getAllCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(`${this.serverUrl}/allcards`);
  }

  public getAllCardsFromDatabase(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(`${this.serverUrl}/getcardsfromdb`);
  }

  public addACard(card: Card): Observable<Card> {
    return this.httpClient.post<Card>(`${this.serverUrl}/addcard`, card);
  }

  public deleteACard(card: Card): Observable<Card> {
    return this.httpClient.delete<Card>(
      `${this.serverUrl}/deletecard/${card.id}`
    );
  }
}
