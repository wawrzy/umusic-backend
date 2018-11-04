const logger = require('../config/winston');
const Room = require('../models/room').model;
const User = require('../models/user').model;

const disconnect = async (socketId) => {
  logger.info(`🕳️  Disconnect with ${socketId}`);
};

module.exports = {
  disconnect,
}
