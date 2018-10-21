const logger = require('../config/winston');
const Room = require('../models/room').model;
const User = require('../models/user').model;

const disconnect = async (socketId) => {
  logger.info(`🕳️  Disconnect with ${socketId}`);

  const user = await User.findOne({ sockets: socketId });

  if (user)
    await Room.update({$pullAll: { users: [user._id] }});
};

module.exports = {
  disconnect,
}
