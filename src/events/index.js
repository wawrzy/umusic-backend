const { joinRoom } = require('./room');
const { disconnect } = require('./disconnect');
const { sendMessage } = require('./chat');

const events = (io) => {
  io.on("connection", socket => {
    const socketId = socket.id;

    socket.on("joinroom", payload => joinRoom(socketId, socket, payload));
    socket.on("disconnect", () => disconnect(socketId));
    socket.on("sendmessage", payload => sendMessage(io, socket, payload));
  });
};

module.exports = events;
