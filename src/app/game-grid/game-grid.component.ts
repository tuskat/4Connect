import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';

enum Direction {
  Up = 1,
  Right,
  DiagonalUp,
  DiagonalDown
}

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css'],
  // providers: [GameService]
})
export class GameGridComponent implements OnInit {
  currentPlayer: number = 1;
  gameOver: boolean = false;
  gridFull: boolean = false;
  gameResult: string = '';
  @Input() currentMode: number;
  @Output() onChosenMode = new EventEmitter<boolean>();

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.initGrid();
  }
  initGrid() {
    this.gameService.initGrid();
  }
  playerPlaceOn(i) {
    if (this.currentMode === 1 && this.currentPlayer === 1
      || this.currentMode === 2) {
      let validAction = this.addToGrid(i);
      if (validAction) {
        this.checkGameStatus();
      }
      if (this.currentMode === 1 && this.gameOver === false) {
        this.aiPlayerPlaceOn();
      }
    }
  }
  checkGameStatus() {

    this.playerHasWon();
    this.isGridFull();

    if (this.gameOver === false) {
      this.currentPlayer++;
      if (this.currentPlayer > 2) {
        this.currentPlayer = 1;
      }
    } else {
      if (this.currentMode === 1 && this.currentPlayer === 1) {
        this.gameResult = "win";
      } else {
        this.gameResult = "lose";
      }
    }

  }

  aiPlayerPlaceOn() {
    let grid = this.gameService.grid;
    setTimeout(() => {
      let aiChoice = this.gameService.brainlessPlay();
      let placed = this.addToGrid(aiChoice);
      if (placed === true) {
        this.checkGameStatus();
      } else {
        this.aiReplaceOn();
      }

    }, 1000);
  }
  aiReplaceOn() {
    let aiChoice = this.gameService.brainlessPlay();
    let placed = this.addToGrid(aiChoice);
    if (placed === false) {
      return this.aiPlayerPlaceOn();
    } else {
      return;
    }

  }

  playerHasWon() {
    let directions = [Direction.Right, Direction.Up, Direction.DiagonalUp, Direction.DiagonalDown];
    var hasWon = false;
    let grid = this.gameService.grid;

    directions.forEach(direction => {
      if (!hasWon) {
        for (let i = 0; i != grid.length; i++) {
          for (let j = 0; j != grid[i].length; j++) {
            hasWon = this.checkIfWinAt(i, j, direction, this.currentPlayer, grid);
            if (hasWon) {
              this.gameOver = true;
              break;
            }
          }
        }
      }
    });
  }

  checkIfWinAt(x, y, direction, player, grid, count: number = 0) {
    let nextX;
    let nextY;

    if (!grid[x][y]) {
      return false;
    }

    if (count === 3) {
      if (grid[x][y] == player) {
        return true;
      }
    }
    switch (direction) {
      case Direction.Right: {
        nextX = x + 1;
        nextY = y;
        break;
      }
      case Direction.Up: {
        nextX = x;
        nextY = y - 1;
        break;
      }
      case Direction.DiagonalUp: {
        nextX = x + 1;
        nextY = y - 1;
        break;
      }
      case Direction.DiagonalDown: {
        nextX = x + 1;
        nextY = y + 1;
        break;
      }
      default: {
        //statements; 
        break;
      }
    }

    if (!grid[nextX]) {
      return false;
    }
    if (!grid[nextX][nextY]) {
      return false;
    }
    if (grid[x][y] === player) {
      return this.checkIfWinAt(nextX, nextY, direction, player, grid, count + 1);
    } else {
      return false;
    }

  }

  addToGrid(index) {
    let added = false;

    let grid = this.gameService.grid;
    let column = null;

    if (index < grid.length) {
      column = grid[index];
    }
    for (let i = (column.length - 1); i >= 0; i--) {
      if (column[i] === 0) {
        column[i] = this.currentPlayer;
        added = true;
        break;
      }
    }
    return added;
  }

  isGridFull() {
    let full = true;
    let grid = this.gameService.grid;

    for (let i = 0; i != grid.length; i++) {
      for (let j = 0; j != grid[i].length; j++) {
        if (grid[i][j] === 0) {
          full = false;
          break;
        }
      }
    }
    if (full === true) {
      this.gridFull = true;
      this.gameOver = true;
    }
    
  }

    resetGame() {
      this.gameService.resetGrid();
      this.onChosenMode.emit(false);
    }
  }