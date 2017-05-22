import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
  private _gamemode = null;
  private _grid = [];
  private _gridHeight = 6;
  private _gridWidth = 7;
  private _score = 100000;

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
  get score() {
    return this._score;
  }
  set score(score: any) {
    this._score = score;
  }
  resetGrid() {
    this._grid = [];
  }
  initGrid() {
    for (let i = 0; i != this._gridWidth; i++) {
      this._grid.push(this.newColumn());
    }
  }

  newColumn() {
    let column = [];
    for (let j = 0; j != this._gridHeight; j++) {
      column.push(0);
    }
    return column;
  }


 
  //
 
  //


  isGridFull(grid) {
    for (let i = 0; i != grid.length; i++) {
      if (grid[i][0] === 0) {
        return false;
      }
    }
    return true;
  }

 
 
}
