import { Component } from '@angular/core';
import { GameService } from './game.service';


enum Mode {
  Solo = 1,
  Multi,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GameService]
})
export class AppComponent {
  title: string = 'Connect Four';
  gameStarted: boolean = false;
  gameMode: number = Mode.Solo;
  constructor(private gameService: GameService) { }

  onChosenMode($event) {
    if ($event === false) {
      this.gameService.gamemode = null;
    }
    if (this.gameService.gamemode !== null) {
      this.gameStarted = true;
      this.gameMode = $event;
    } else {
      this.gameStarted = false;
    }
  }
}
