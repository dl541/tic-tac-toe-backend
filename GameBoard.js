const { GameBoardGrid, GridState } = require("./GameBoardGrid");

class GameBoard {
  constructor() {
    this.length = 3;
    this.grids = this.constructBoardGrids();
    this.stateCountInRows = [...Array(this.length).keys()].map(index => new StateCounter());
    this.stateCountInCols = [...Array(this.length).keys()].map(index => new StateCounter());
    this.stateCountInDiags =[...Array(2).keys()].map(index => new StateCounter());
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

  setGridState(gridState, coordinate) {
    var [ r, c ] = coordinate;
    console.log(r, c);
    this.grids[r][c].state = gridState;
  }

  isWinner(gridState){
      checkIfWinByRows(gridState)
      checkIfWinByCols(gridState)
      checkIfWinByDiags(gridState)
  }

  checkIfWinByRows(gridState){
      for (var r = 0; r < this.length; r++){
          this.checkIfWinByRows()
      }
  }

  checkIfWinByRow(){

  }
}

class StateCounter extends Map{
    constructor(){
        super([[GridState.CROSS, 0],[GridState.NAUGHT, 0]]);
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
board.setGridState(GridState.CROSS, [1,2]);
console.log(board.stateCountInRows);

