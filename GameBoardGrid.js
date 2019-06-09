const CustomErrors = require("./CustomErrors");

class GameBoardGrid {
  constructor() {
    this._state = GridState.UNOCCUPIED;
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    if (this.isAvailable()) {
      this._state = newState;
    } else {
      throw new CustomErrors.GridOccupiedError(
        `This grid is occupied with the symbol ${this.state}.`
      );
    }
  }

  isAvailable() {
    return this._state === GridState.UNOCCUPIED;
  }
}

const GridState = {
  CROSS: "X",
  NAUGHT: "O",
  UNOCCUPIED: "?"
};

module.exports = {
    GameBoardGrid: GameBoardGrid,
    GridState: GridState
}