const { joinRoom } = require('./room');
const { disconnect } = require('./disconnect');

const events = (io) => {
  io.on("connection", socket => {
    const socketId = socket.id;

    socket.on("joinroom", payload => joinRoom(socketId, payload));
    socket.on("disconnect", () => disconnect(socketId));
  });
};

module.exports = events;
