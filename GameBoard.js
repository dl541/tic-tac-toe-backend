const { GameBoardGrid, GridState } = require("./GameBoardGrid");

class GameBoard {
  constructor() {
    this.length = 3;
    this.grids = this.constructBoardGrids();
    this.unoccupiedGridCount = this.length * this.length;
    this.stateCountersForRows = [...Array(this.length).keys()].map(
      index => new StateCounter(this.length)
    );
    this.stateCountersForCols = [...Array(this.length).keys()].map(
      index => new StateCounter(this.length)
    );
    this.stateCountersForDiags = [...Array(2).keys()].map(
      index => new StateCounter(this.length)
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
    this.unoccupiedGridCount -= 1;
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
    var currentCount = this.stateCountersForRows[row].get(gridState);
    this.stateCountersForRows[row].set(gridState, currentCount + 1);
  }

  updateStateCountInCols(gridState, col) {
    var currentCount = this.stateCountersForCols[col].get(gridState);
    this.stateCountersForCols[col].set(gridState, currentCount + 1);
  }

  updateStateCountInDiags(gridState, coordinate) {
    var [r, c] = coordinate;
    if (r == c) {
      var currentCount = this.stateCountersForDiags[0].get(gridState);
      this.stateCountersForDiags[0].set(gridState, currentCount + 1);
    }

    if (r == this.length - 1 - c) {
      var currentCount = this.stateCountersForDiags[1].get(gridState);
      this.stateCountersForDiags[1].set(gridState, currentCount + 1);
    }
  }

  isWinner(gridState) {
    return (
      this.isMaxLimitReachedInCounters(this.stateCountersForCols, gridState) ||
      this.isMaxLimitReachedInCounters(this.stateCountersForRows, gridState) ||
      this.isMaxLimitReachedInCounters(this.stateCountersForDiags, gridState)
    );
  }

  isMaxLimitReachedInCounters(counters, gridState) {
    return counters.some(counter => counter.isMaxLimitReached(gridState));
  }

  isFull() {
    return this.unoccupiedGridCount === 0;
  }

  isCoordinateWithinBoundary(coordinate) {
    var [r,c] = coordinate;
    return r >= 0 && r < 3 && c >= 0 && c < 3
  }

  isGridAvailable(coordinate) {
    var [r,c] = coordinate;
    return this.grids[r][c].state === GridState.UNOCCUPIED;
  }
}

class StateCounter extends Map {
  constructor(maxLimit) {
    super();
    this.maxLimit = maxLimit;
    this.set(GridState.NAUGHT, 0);
    this.set(GridState.CROSS, 0);
  }

  isMaxLimitReached(gridState) {
    return this.get(gridState) === this.maxLimit;
  }
}

GameBoard.prototype.toString = function() {
  var stringBuffer = new Array(this.length);

  for (var i = 0; i < this.length; i++) {
    stringBuffer[i] = this.grids[i].map(grid => grid.state).join("");
  }

  return stringBuffer.join("\n");
};

module.exports = GameBoard;
