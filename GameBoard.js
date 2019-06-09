const { GameBoardGrid, GridState } = require("./GameBoardGrid");

class GameBoard {
  constructor() {
    this.length = 3;
    this.grids = this.constructBoardGrids();
    this.stateCountInRows = [...Array(this.length).keys()].map(
      index => new StateCounter()
    );
    this.stateCountInCols = [...Array(this.length).keys()].map(
      index => new StateCounter()
    );
    this.stateCountInDiags = [...Array(2).keys()].map(
      index => new StateCounter()
    );
  }

  constructBoardGrids() {
    var rows = Array(this.length);
    for (var i = 0; i < this.length; i++) {
      rows[i] = new Array(this.length);
      for (var j = 0; j < this.length; j++) {
        rows[i][j] = new GameBoardGrid();
      }
    }
    return rows;
  }

  makeMove(gridState, coordinate) {
    this.setGridState(gridState, coordinate);
    this.updateStateCount(gridState, coordinate);
  }

  setGridState(gridState, coordinate) {
    var [r, c] = coordinate;
    this.grids[r][c].state = gridState;
  }

  updateStateCount(gridState, coordinate) {
    var [r, c] = coordinate;
    this.updateStateCountInRows(gridState, r);
    this.updateStateCountInCols(gridState, c);
    this.updateStateCountInDiags(gridState, coordinate);
  }

  updateStateCountInRows(gridState, row) {
    var currentCount = this.stateCountInRows[row].get(gridState);
    this.stateCountInRows[row].set(gridState, currentCount + 1);
  }

  updateStateCountInCols(gridState, col) {
    var currentCount = this.stateCountInCols[col].get(gridState);
    this.stateCountInCols[col].set(gridState, currentCount + 1);
  }

  updateStateCountInDiags(gridState, coordinate) {
    var [r, c] = coordinate;
    if (r == c) {
        var currentCount = this.stateCountInDiags[0].get(gridState);
      this.stateCountInDiags[0].set(gridState, currentCount + 1);
    }

    if (r == this.length - 1 - c) {
        var currentCount = this.stateCountInDiags[1].get(gridState);
      this.stateCountInDiags[1].set(gridState, currentCount + 1);
    }
  }

  isWinner(gridState) {
    checkIfWinByRows(gridState);
    checkIfWinByCols(gridState);
    checkIfWinByDiags(gridState);
  }

  checkIfWinByRows(gridState) {
    for (var r = 0; r < this.length; r++) {
      this.checkIfWinByRows();
    }
  }

  checkIfWinByRow() {}
}

class StateCounter extends Map {
  constructor() {
    super();
    this.set(GridState.NAUGHT, 0);
    this.set(GridState.CROSS, 0);
  }
}

GameBoard.prototype.toString = function() {
  var stringBuffer = new Array(this.length);

  for (var i = 0; i < this.length; i++) {
    stringBuffer[i] = this.grids[i].map(grid => grid.state).join("");
  }

  return stringBuffer.join("\n");
};

var board = new GameBoard();
console.log(board.toString());
board.makeMove(GridState.CROSS, [1, 2]);
console.log(board.stateCountInRows, board.stateCountInCols, board.stateCountInDiags);

board.makeMove(GridState.NAUGHT, [1, 1]);
console.log(board.stateCountInRows, board.stateCountInCols, board.stateCountInDiags);
