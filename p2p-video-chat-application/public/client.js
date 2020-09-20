const $ = require("jquery");
const io = require("socket.io-client");
const getUserMedia = require("getusermedia");
const SimplePeer = require("simple-peer");

$(document).ready(function () {
  let peer;
  let initiator;
  let joinRequest;

  getUserMedia(function (err, stream) {
    if (err) {
      console.log(err);
      alert("Getting Audio/Video failed.");
      console.log("getting user stream failed");
      return;
    }

    console.log("got a stream", stream);

    const localVideo = document.querySelector("#localVideo");
    localVideo.srcObject = stream;
    localVideo.onloadedmetadata = function (e) {
      localVideo.play();
    };

    const room = prompt("Type a room name");

    while ($.trim(room) === "") room = prompt("Type a room name");

    const socket = io();

    socket.on("connect", function () {
      console.log("Connected to Server!");
      joinRequest = true;
      socket.emit("create or join", room);
    });

    socket.on("roomMessage", function (roomMessage) {
      console.log(
        `Server sent room message : ${roomMessage.room} - ${roomMessage.data}`
      );
      peer.signal(roomMessage.data);
    });

    socket.on("joined room", function (joinMessage) {
      console.log(JSON.stringify(joinMessage));
      joinRequest = false;
      initiator = joinMessage.initiator;
      console.log("initiator value is " + initiator);
      if (initiator === false) createPeer({ stream: stream });
    });

    socket.on("newcomer", function (message) {
      console.log(`A newcomer of the room sent ${message}`);

      if (initiator === true) createPeer({ initiator: true, stream: stream });
    });

    socket.on("errorMessage", function (message) {
      if (joinRequest === true) {
        alert(`Sorry. Room ${room} is full. Click OK to try another room.`);
        joinNewRoom();
      }
      console.log("Server sent error message : " + JSON.stringify(message));
    });

    function joinNewRoom() {
      room = prompt("Type a room name");

      while ($.trim(room) === "") room = prompt("Type a room name");

      joinRequest = true;
      socket.emit("create or join", room);
    }

    function createPeer(opts) {
      console.log("Peer was created with opts " + JSON.stringify(opts));
      peer = new SimplePeer(opts);

      peer.on("signal", function (data) {
        const roomMessage = {
          room: room,
          data: data,
        };
        socket.emit("roomMessage", roomMessage);
      });

      peer.on("stream", function (stream) {
        console.log("Streaming Remote Video!");
        const remoteVideo = document.querySelector("#remoteVideo");
        remoteVideo.srcObject = stream;
        remoteVideo.onloadedmetadata = function (e) {
          remoteVideo.play();
        };
      });

      peer.on("close", function () {
        if (initiator === false) initiator = true;

        console.log("Peer closed");
        peer.destroy();
        peer = null;
      });

      peer.on("error", function (error) {
        alert("Sorry. Somme fatal error occured.");
        console.log("Some fatal error occured : " + error);
      });
    }
  });
});
