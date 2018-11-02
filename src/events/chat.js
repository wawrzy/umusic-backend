const moment = require('moment');

const logger = require('../config/winston');
const Room = require('../models/room').model;
const User = require('../models/user').model;
const Chat = require('../models/chat').model;
const { checkJSON, checkAuthorization } = require('../helpers/check');

// Chat commands //

const addVideo = async (message, room) => {
  if (message.search(/!video /i) === -1)
    return;
  
  let video_id = message.split('v=')[1];
  const ampersandPosition = video_id.indexOf('&');
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  
  if (video_id && video_id !== '')
    await Room.update({ _id: room._id }, { $push: { videos: video_id } })
}

//////////////////

const addMessageToRoom = async (io, socket, message, authorization) => {
  const user = await User.findOne({ token: authorization });

  if (!user)
    return logger.error(`[sendMessage] user not found with token: ${authorization}`);

  const room = await Room.findOne({ users: user._id });

  if (!room)
    return user._id;

  const newMessage = new Chat();

  newMessage.sender = user._id;
  newMessage.createdAt = moment().valueOf();
  newMessage.message = message;
  newMessage.roomId = room._id;

  try {
    await newMessage.save();
    await addVideo(message, room);
    socket.join(room._id);
    io.to(room._id).emit('chat', {
      sender: user.alias,
      createdAt: newMessage.createdAt,
      message,
      roomId: room._id,
    });
  } catch (err) {
    logger.error(err.message);
  }
}

const sendMessage = async (io, socket, payload) => {
  logger.info(`Send message`);
  logger.info('Payload : ', payload);

  if (!checkJSON(payload, [ 'authorization', 'message' ]))
    return logger.error(`[sendMessage] Bad payload ${JSON.stringify(payload)}`);

  const { authorization, message  } = payload;

  try {
    const isAuthorized = await checkAuthorization(authorization);
 
    if (!isAuthorized)
      return logger.error(`[sendMessage] Token invalid or expired ${authorization}`);

    await addMessageToRoom(io, socket, message, authorization);
  } catch (err) {
    logger.error(`[sendMessage] Exception : ${err.message}`)
  }
};

module.exports = {
  sendMessage,
}
