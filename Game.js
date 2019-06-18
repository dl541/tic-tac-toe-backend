const GameBoard = require("./GameBoard");
const readlineSync = require("readline-sync");
const { GameBoardGrid, GridState } = require("./GameBoardGrid");
const Player = require("./Player");

class Game {
  constructor(gameId, player1, player2) {
    this.gameId = gameId;
    this.gameBoard = new GameBoard();
    this.playersQueue = [player1, player2];

    this.start();
  }

  start() {
    this.shufflePlayersQueue();
    this.assignSymbolToPlayers();
    console.log(this.playersQueue);
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
      console.log(`The move is ${move}`);
      if (this.updateGameState(move)) {
        this.rotateQueue();
      }
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
    var currentPlayer = this.playersQueue[0];

    if (this.isMoveValid(move)) {
      this.gameBoard.makeMove(currentPlayer.symbol, move);
      return true;
    } else {
      return false;
    }
  }

  isMoveValid(move) {
    if (!this.gameBoard.isCoordinateWithinBoundary(move)) {
      console.log("The move is out of boundary.");
      return false;
    }

    if (!this.gameBoard.isGridAvailable(move)) {
      console.log("This grid is occupied.");
      return false;
    }

    return true;
  }
  shouldTerminate() {
    var currentPlayer = this.playersQueue[0];
    if (this.gameBoard.isWinner(currentPlayer.symbol)) {
      console.log(`${currentPlayer.symbol} won!`);
      return true;
    } else if (this.gameBoard.isFull()) {
      console.log("The board is full. This is a draw.");
      return true;
    }
    return false;
  }
}

var player1 = new Player();
var player2 = new Player();
new Game(123, player1, player2).run();
