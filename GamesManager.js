const io = require("socket.io")();
const Game = require("./Game");
const uuidv4 = require("uuid/v4");
const Player = require("./Player")
var game = new Game("123", new Player(), new Player());

io.on("connection", client => {
  console.log("A client has joined the server.");
  client.on("change grid state", data => {
    console.log(data);
    if (game.updateGameState([data.rowIndex, data.colIndex])){
        console.log("successfully update grid state")
        client.emit("successfully change state", data)
    }
    else{
        console.log("failed to update grid state")
    }
  });
  client.on("disconnect", () => {
    console.log("User disconnected.");
  });
});

function generateNewGameId() {
  do {
    var gameId = uuidv4();
  } while (!gameId in gameRooms);

  return gameId;
}

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
