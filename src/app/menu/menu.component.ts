import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
 // providers: [GameService]
})
export class MenuComponent implements OnInit {
  @Output() onChosenMode = new EventEmitter<number>();

  constructor(private gameService : GameService) { }

  ngOnInit() {
  }

  playGame(event : number) {
    this.gameService.gamemode = event;
    this.onChosenMode.emit(event);
  }
}
