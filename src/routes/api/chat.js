const router = require('express').Router();
const boom = require('boom');

const authentication = require('../../middlewares/authentication');
const asyncErrors = require('../../middlewares/error');
const Room = require('../../models/room').model;
const Chat = require('../../models/chat').model;
const logger = require('../../config/winston');


router.get('/messages/:id', authentication.isAuthenticated, authentication.isInRoom, asyncErrors(async (req, res) => {
  const { id } = req.params;

  if (!id)
    throw boom.badRequest('Missing id');

  try {
    const room = await Room.findById(id);

    Chat.find({roomId: room._id}, { _id: 0 })
        .select('sender roomId createdAt message')
        .sort({ createdAt: 'desc' })
        .populate('sender')
        .exec((err, data) => {
          if (err)
            throw err;
          res.send(data);
        });
  } catch (err) {
    logger.error(err.message);
    throw boom.internal('Internal');
  }
}));

module.exports = router;
