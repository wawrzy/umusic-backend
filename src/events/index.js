const { joinRoom } = require('./room');
const { disconnect } = require('./disconnect');
const { sendMessage } = require('./chat');
const { nextMusic, currentMusic } = require('./player');

const handleConnection = (socket) => {
  const socketId = socket.id;

  socket.on("joinroom", payload => joinRoom(socketId, socket, payload));
  socket.on("disconnect", () => disconnect(socketId));
  socket.on("sendmessage", payload => sendMessage(io, socket, payload));
  socket.on("currentmusic", payload => currentMusic(io, socket, payload));
  socket.on("nextmusic", payload => nextMusic(io, socket, payload));
}

const events = (io) => {
  io.on("connection", handleConnection);
};

module.exports = events;
