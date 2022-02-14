require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

app.use(express.static("public"));

const portNum = process.env.PORT || 3000;

server.listen(portNum, function () {
  console.log("Listening on port " + portNum);
});

io.on("connection", function (socket) {
  socket.on("create or join", function (room) {
    io.in(room)
      .allSockets()
      .then(function (clients) {
        if (clients.size >= 2) {
          socket.emit("errorMessage", `Could not join room. It's full!`);
          return;
        }

        socket.join(room);

        const joinMessage = {
          initiator: true,
          data: `You have successfully joined ${room}!`,
        };

        if (clients.size == 0) {
          socket.emit("joined room", joinMessage);
        } else {
          joinMessage.initiator = false;
          socket.emit("joined room", joinMessage);
          socket.to(room).emit("newcomer", "Hi there people!");
        }

        console.log(`${room} room has ${clients.size} people`);
      });
  });

  socket.on("roomMessage", function (roomMessage) {
    io.in(roomMessage.room).allSockets().then(function (clients) {
      if (clients.has(socket.id)) {
        console.log(
          `Client ${socket.id} sent room message : ${roomMessage.room} - ${roomMessage.data}`
        );
        socket.to(roomMessage.room).emit("roomMessage", roomMessage);
      } else {
        socket.emit("errorMessage", `You don't belong to this room kid!`);
      }
    });
  });
});
