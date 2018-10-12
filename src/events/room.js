const logger = require('../config/winston');
const { checkJSON, checkAuthorization } = require('../helpers/check');

const joinRoom = (socketId, payload) => {
  logger.info(`🕹️  Join room with ${socketId}`);
  logger.info('Payload : ', payload);
  if (!checkJSON(payload, [ 'authorization', 'roomId', 'userId', 'password' ]))
    return logger.error(`[joinRoom] Bad payload ${JSON.stringify(payload)}`);

  const { authorization, roomId, userId, password  } = payload;

  if (!checkAuthorization(authorization))
    return logger.error(`[joinRoom] Token invalid or expired ${authorization}`);    
};

module.exports = {
  joinRoom,
}