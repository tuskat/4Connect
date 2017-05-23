import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  @Input() currentMode: number;
  _playerScore: number[] = [0, 0];
  _computerScore: number = 0;
  _gameStart: Date;
  _gameEnd: Date;
  opponent: string = "P2";

  constructor() { }
  ngOnInit() {
    if (this.currentMode === 1) {
      this.opponent = "CPU";
    }

  }
  get playerScore() {
    return this._playerScore;
  }
  set playerScore(playerScore: number[]) {
    this._playerScore = playerScore;
  }

  get computerScore() {
    return this._computerScore;
  }
  set computerScore(computerScore: number) {
    this._computerScore = computerScore;
  }

  playerWon(player) {
    if (this.currentMode === 2) {
      if (player === 1) {
        this.playerScore[0]++;
      } else {
        this.playerScore[1]++;
      }
    } else {
      if (player === 1) {
        this.playerScore[0]++;
      } else {

        this.computerScore++;
      }
    }
  }
  gameStart() {
    this._gameStart = new Date();
  }
  gameEnded() {
    this._gameEnd  = new Date();
    let diff = (this._gameEnd.getSeconds() - this._gameStart.getSeconds());
    return diff;
  }
}
