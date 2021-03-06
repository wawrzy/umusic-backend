const { joinRoom, leaveRoom } = require('./room');
const { disconnect } = require('./disconnect');
const { sendMessage } = require('./chat');
const { nextMusic, currentMusic, pauseMusic, continueMusic } = require('./player');

const handleConnection = (io, socket) => {
  const socketId = socket.id;

  socket.on("joinroom", payload => joinRoom(socketId, socket, payload));
  socket.on("leaveroom", payload => leaveRoom(io, socket, payload));
  socket.on("disconnect", () => disconnect(socketId));
  socket.on("sendmessage", payload => sendMessage(io, socket, payload));
  socket.on("currentmusic", payload => currentMusic(io, socket, payload));
  socket.on("nextmusic", payload => nextMusic(io, socket, payload));
  socket.on("pausemusic", payload => pauseMusic(io, socket, payload));
  socket.on("continuemusic", payload => continueMusic(io, socket, payload));
}

const events = (io) => {
  io.on("connection", (socket) => handleConnection(io, socket));
};

module.exports = events;
