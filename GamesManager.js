const io = require("socket.io")();

io.on("connection", (client) => {
  console.log("A client has joined the server.");

  client.on("change grid state", (data) => {
      console.log(data);
  })
  client.on("disconnect", () => {
    console.log("User disconnected.");
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
