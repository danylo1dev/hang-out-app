const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

app.use(express.static("client"));

io.on("connection", (socket) => {
  console.log(`A user connected with id ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User with id ${socket.id} Disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
