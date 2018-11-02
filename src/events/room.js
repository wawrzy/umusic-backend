const logger = require('../config/winston');
const { checkJSON, checkAuthorization } = require('../helpers/check');
const Room = require('../models/room').model;
const User = require('../models/user').model;

const addUserToRoom = async (roomId, token, password, socketId) => {
  const user = await User.findOne({ token });
  const room = await Room.findById(roomId);

  if (!user || !room || (room.password !== '' && !room.validPassword(password))) {
    return logger.error(`[joinRoom:addUser] Room not found or password invalid`);
  }

  if (room.users.indexOf(user._id) !== -1)
    return true;
  await Room.update({ users: user._id }, { $pullAll: { users: [user._id] } });
  await Room.findOneAndUpdate({ _id: roomId }, { $addToSet: { users: user._id } });
  await User.updateOne({ _id: user._id }, { $addToSet: { sockets: socketId } });

  return true;
}

const joinRoom = async (socketId, socket, payload) => {
  logger.info(`🕹️  Join room with ${socketId}`);
  logger.info('Payload : ', payload);
  if (!checkJSON(payload, [ 'authorization', 'roomId', 'password' ]))
    return logger.error(`[joinRoom] Bad payload ${JSON.stringify(payload)}`);

  const { authorization, roomId, password  } = payload;

  try {
    const isAuthorized = await checkAuthorization(authorization);
 
    if (!isAuthorized)
      return logger.error(`[joinRoom] Token invalid or expired ${authorization}`);

    const isAdded = await addUserToRoom(roomId, authorization, password, socket.id);
    if (isAdded) {
      socket.join(roomId);
      socket.emit('redirectroom', { roomId });
    }
  } catch (err) {
    logger.error(`[joinRoom] Exception : ${err.message}`)
  }
};

module.exports = {
  joinRoom,
}