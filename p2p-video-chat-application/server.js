require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const browserify = require('browserify-middleware');

app.get('/bundle.js', browserify('public/client.js'));
app.use(express.static('public'));

const portNum = process.env.PORT || 3000;

//Start our server and tests!
app.listen(portNum, function () {
  console.log("Listening on port " + portNum);
});

io.on('connection',function(socket){

  socket.on('create or join',function(room){

    io.in(room).clients(function(error, clients){
      if (error) {
        throw error;
        return;
      }

      if(clients.length >= 2)
      {
        socket.emit('errorMessage',`Could not join room. It's full!`);
        return;
      }

      socket.join(room);

      const joinMessage = {
        initiator : true,
        data : `You have successfully joined ${room}!`
      };

      if(clients.length == 0) {
          socket.emit('joined room',joinMessage);
      } else {
          joinMessage.initiator = false;
          socket.emit('joined room',joinMessage);
          socket.to(room).emit('newcomer','Hi there people!');
      }

      console.log(`${room} room has ${clients.length} people`);
    });

  });

  socket.on('roomMessage',function(roomMessage){

    io.in(roomMessage.room).clients(function(error, clients){
      if (error) {
        throw error;
        return;
      }

      if(clients.indexOf(socket.id)!==-1) {
        console.log(`Client ${socket.id} sent room message : ${roomMessage.room} - ${roomMessage.data}`);
        socket.to(roomMessage.room).emit('roomMessage',roomMessage);
      } else {
        socket.emit('errorMessage',`You don't belong to this room kid!`);
      }

    });

  })

});
