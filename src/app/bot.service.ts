import { Injectable } from '@angular/core';

@Injectable()
export class BotService {
  private _gridHeight = 6;
  private _gridWidth = 7;
  private _score = 100000;

  constructor() { }
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

  switchPlayer(currentPlayer) {
    if (currentPlayer === 2)
      return 1;
    else
      return 2;
  }

  maximizePlay(grid, depth, currentPlayer = 2) {
    let score = this.getScore(grid);
    if (this.isFinished(grid, depth, score)) {
      return [null, score];
    }
    let max = [null, -99999];

    for (let i = 0; i != grid.length; i++) {
      let new_grid = this.cloneArray(grid);
      if (this.aiPlace(new_grid, i, currentPlayer)) {

        let next_move = this.minimizePlay(new_grid, depth - 1, this.switchPlayer(currentPlayer));
        if (max[0] == null || next_move[1] > max[1]) {
          max[0] = i;
          max[1] = next_move[1];
        }
      }
    }
    return max;
  }
  minimizePlay(grid, depth, currentPlayer = 2) {
    let score = this.getScore(grid);
    if (this.isFinished(grid, depth, score)) {
      return [null, score];
    }
    let min = [null, 99999];

    for (let i = 0; i != grid.length; i++) {

      let new_grid = this.cloneArray(grid);
      if (this.aiPlace(new_grid, i, currentPlayer)) {

        let next_move = this.maximizePlay(new_grid, depth - 1, this.switchPlayer(currentPlayer));
        if (min[0] == null || next_move[1] < min[1]) {
          min[0] = i;
          min[1] = next_move[1];
          //   console.log(min);
        }
        //   console.log(next_move);
      }

    }
    return min;
  }

  scorePosition(grid, row, column, delta_y, delta_x) {
    let human_points = 0;
    let computer_points = 0;

    // this.playerWinningCase = [];
    //   this.aiWinningCase = [];

    for (let i = 0; i < 4; i++) {

      if (grid[row][column] === 1) {
        //    this.playerWinningCase.push([column, row]);
        human_points++;
      } else if (grid[row][column] === 2) {
        //     this.aiWinningCase.push([column, row]);

        computer_points++;
      }

      row += delta_y;
      column += delta_x;
    }

    if (human_points == 4) {
      //    this.winningArray = this.playerWinningCase;
      return -this.score;
    } else if (computer_points == 4) {
      //     this.winningArray = this.aiWinningCase;
      return this.score;
    } else {
      return computer_points;
    }
  }
  getScore(grid) {
    let height = this._gridHeight;
    let width = this._gridWidth;

    let points = 0;

    let vertical_points = 0;
    let horizontal_points = 0;
    let diagonal_points1 = 0;
    let diagonal_points2 = 0;


    //   console.log(grid.length, grid[0].length);
    for (let row = 0; row < width - 3; row++) {
      for (let column = 0; column < height; column++) {

        let score = this.scorePosition(grid, row, column, 1, 0);
        //  let score = this.scorePosition(grid, column, row, 1, 0);
        if (score === this.score) return this.score;
        if (score === -this.score) return -this.score;
        vertical_points += score;
      }
    }

    for (let row = 0; row < width; row++) {
      for (let column = 0; column < height - 3; column++) {

        let score = this.scorePosition(grid, row, column, 0, 1);
        // let score = this.scorePosition(grid, column, row,0, 1);
        if (score === this.score) return this.score;
        if (score === -this.score) return -this.score;
        horizontal_points += score;
      }
    }


    for (let row = 0; row < height - 3; row++) {
      for (let column = 0; column < width - 3; column++) {

        let score = this.scorePosition(grid, row, column, 1, 1);
        // let score = this.scorePosition(grid, column, row, 1,1);
        if (score === this.score) return this.score;
        if (score === -this.score) return -this.score;
        diagonal_points1 += score;
      }
    }


    for (let row = 3; row < height; row++) {
      for (let column = 0; column <= width - 4; column++) {

        let score = this.scorePosition(grid, row, column, -1, 1);
        // let score = this.scorePosition(grid, column, row, -1, 0);
        if (score === this.score) return this.score;
        if (score === -this.score) return -this.score;
        diagonal_points2 += score;
      }
    }

    points = horizontal_points + vertical_points + diagonal_points1 + diagonal_points2;

    return points;
  }
  isFinished = function (grid, depth, score) {
    if (depth === 0
      || score === this.score
      || score === -this.score
      || this.isGridFull(grid)) {
      return true;
    }
    return false;
  }
  cloneArray(currentArray) {
    let newArray = [];
    for (let i = 0; i < currentArray.length; i++) {
      newArray[i] = currentArray[i].slice();
    }
    return newArray;
  }
  aiPlace(grid, column, currentPlayer = 2) {
    if (grid[column][0] == 0 && column >= 0 && column < grid.length) {
      for (var y = this.gridHeight - 1; y >= 0; y--) {
        if (grid[column][y] === 0) {
          grid[column][y] = currentPlayer;
          break;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  // 
  brainlessPlay() {
    let min = 0;
    let max = this._gridWidth - 1;
    let random = Math.floor(Math.random() * (max - min)) + min;
    return random;
  }
    isGridFull(grid) {
    for (let i = 0; i != grid.length; i++) {
      if (grid[i][0] === 0) {
        return false;
      }
    }
    return true;
  }
}
