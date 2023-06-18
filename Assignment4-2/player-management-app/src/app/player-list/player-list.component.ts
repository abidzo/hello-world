import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: any[] | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPlayers();
  }

  fetchPlayers() {
    this.http.get<any[]>('/api/players').subscribe(
      (players) => {
        this.players = players;
      },
      (error) => {
        console.error('Error fetching players:', error);
      }
    );
  }

  editPlayer(player: any) {
    // Implement the logic to open a modal or navigate to the edit player page
    console.log('Edit player:', player);
  }

  deletePlayer(player: any) {
    if (confirm('Are you sure you want to delete this player?')) {
      this.http.delete(`/api/players/${player._id}`).subscribe(
        () => {
          this.fetchPlayers();
        },
        (error) => {
          console.error('Error deleting player:', error);
        }
      );
    }
  }
}
