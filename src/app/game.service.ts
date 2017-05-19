import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  private _gamemode = null;
  private _grid = [];
  private _gridHeight = 6;
  private _gridWidth = 7;

  constructor() { }

  get gamemode() {
    return this._gamemode;
  }
  set gamemode(mode: number) {
    this._gamemode = mode;
  }
  get grid() {
    return this._grid;
  }
  set grid(grid: any) {
    this._grid = grid;
  }
  get gridHeight() {
    return this._gridHeight;
  }
  set gridHeight(gridHeight: any) {
    this._gridHeight = gridHeight;
  }
  get gridWidth() {
    return this._gridWidth;
  }
  set gridWidth(gridWidth: any) {
    this._gridWidth = gridWidth;
  }

  resetGrid() {
    this._grid = [];
  }

  initGrid() {
    for (let i = 0; i != this._gridHeight; i++) {
      this._grid.push(this.newColumn());
    }
  }

  newColumn() {
    let column = [];
    for (let i = 0; i != this._gridWidth; i++) {
      column.push(0);
    }
    return column;
  }


  brainlessPlay() {
    let min = 0;
    let max = this._gridWidth - 1;
    let random = Math.floor(Math.random() * (max - min)) + min;
    return random;
  }

  cloneArray(currentArray) {
    var newArray = [];
    for (var i = 0; i < currentArray.length; i++) {
      newArray[i] = currentArray[i].slice();
    }
    return newArray;
  }

   testAddToGrid(index, grid, currentPlayer = 2) {
    let added = false;

    let column = null;

    if (index < grid.length) {
      column = grid[index];
    }
    for (let i = (column.length - 1); i >= 0; i--) {
      if (column[i] === 0) {
        column[i] = currentPlayer;
        added = true;
        break;
      }
    }

    return added;
  }
}
