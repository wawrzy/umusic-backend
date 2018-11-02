const logger = require('../config/winston');
const { checkJSON, checkAuthorization } = require('../helpers/check');
const Room = require('../models/room').model;
const User = require('../models/user').model;

const currentMusic = async (io, socket, payload) => {
  logger.info(`Current music`);
  logger.info('Payload : ', payload);

  if (!checkJSON(payload, [ 'authorization' ]))
    return logger.error(`[currentMusic] Bad payload ${JSON.stringify(payload)}`);

  const { authorization  } = payload;

  try {
    const isAuthorized = await checkAuthorization(authorization);
  
    if (!isAuthorized)
      return logger.error(`[currentMusic] Token invalid or expired ${authorization}`);

    const user = await User.findOne({ token: authorization });
    const room = await Room.findOne({ users: user._id });

    if (room && room.videos.length > 0)
      socket.emit('playvideo', { videoId: room.videos[0] });
  } catch (err) {
    logger.error(`[currentMusic] Exception : ${err.message}`)
  }
}

const nextMusic = async (io, socket, payload) => {
  logger.info(`Current music`);
  logger.info('Payload : ', payload);

  if (!checkJSON(payload, [ 'authorization' ]))
    return logger.error(`[nextMusic] Bad payload ${JSON.stringify(payload)}`);

  const { authorization  } = payload;

  try {
    const isAuthorized = await checkAuthorization(authorization);
  
    if (!isAuthorized)
      return logger.error(`[nextMusic] Token invalid or expired ${authorization}`);

    const user = await User.findOne({ token: authorization });
    const room = await Room.findOne({ users: user._id });

    if (room.creator !== user._id)
      return logger.error(`[nextMusic] User is not the room owner`);

    if (room) {
      const videos = room.videos;

      videos.shift();
      await Room.findOneAndUpdate({ _id: room._id }, { $set: { videos } });

      if (videos.length > 0)
        socket.emit('playvideo', { videoId: videos[0] });
    }
  } catch (err) {
    logger.error(`[nextMusic] Exception : ${err.message}`)
  }  
}

module.exports = { currentMusic, nextMusic };
