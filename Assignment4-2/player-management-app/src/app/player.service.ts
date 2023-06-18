import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/players';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  updatePlayer(player: Player): Observable<any> {
    const url = `${this.apiUrl}/${player._id}`;
    return this.http.put(url, player);
  }

  deletePlayer(playerId: string): Observable<any> {
    const url = `${this.apiUrl}/${playerId}`;
    return this.http.delete(url);
  }
}
