const logger = require('../config/winston');
const Room = require('../models/room').model;
const User = require('../models/user').model;

const disconnect = async (socketId) => {
  logger.info(`🕳️  Disconnect with ${socketId}`);

  try {
    const user = await User.findOne({ sockets: socketId });

    if (user)
      await Room.update({$pullAll: { users: [user._id] }});
  } catch (err) {
    logger.error(`[disconnect] error : ${err.message}`)
  }
};

module.exports = {
  disconnect,
}
