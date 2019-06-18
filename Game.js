const GameBoard = require("./GameBoard");
const readlineSync = require("readline-sync");
const { GameBoardGrid, GridState } = require("./GameBoardGrid");

class Game {
  constructor(gameId, player1, player2) {
    this.gameId = gameId;
    this.gameBoard = new GameBoard();
    this.playersQueue = [player1, player2];
  }

  start() {
    this.shufflePlayersQueue();
    this.assignSymbolToPlayers();
  }

  shufflePlayersQueue() {
    if (Math.random() > 0.5) {
      this.rotateQueue();
    }
  }

  assignSymbolToPlayers() {
    this.playersQueue[0].symbol = GridState.CROSS;
    this.playersQueue[1].symbol = GridState.NAUGHT;
  }
  rotateQueue() {
    this.playersQueue.push(this.playersQueue.shift());
  }

  run() {
    do {
      this.displayGameState();
      var move = this.readPlayerMove();
      console.log(`The move is ${move}`)
      this.updateGameState(move);
    } while (!this.shouldTerminate());
  }

  displayGameState() {
    this.displayGameBoardState();
    this.displayPlayerToPlay();
  }

  displayGameBoardState() {
    console.log(this.gameBoard.toString());
  }

  displayPlayerToPlay() {
    console.log(`This is player's turn.`);
  }

  readPlayerMove() {
    var input = readlineSync.question("What's your next move?");
    return input.split(" ").map(string => parseInt(string));
  }

  updateGameState(move) {

  }

  shouldTerminate() {
    if (true) {
    }
  }
}

new Game().run();
