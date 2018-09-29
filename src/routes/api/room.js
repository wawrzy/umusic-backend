const router = require('express').Router();
const boom = require('boom');
const moment = require('moment');

const authentication = require('../../middlewares/authentication');
const asyncErrors = require('../../middlewares/error');
const Room = require('../../models/room').model;
const logger = require('../../config/winston');

router.post('/create', authentication.isAuthenticated, asyncErrors(async (req, res) => {
    const { name, password } = req.body;

    if (!name)
      throw boom.badRequest('Missing body parameter(s)');

    const createdAt = moment().valueOf();

    const newRoom = new Room();

    newRoom.name = name;
    newRoom.createdAt = createdAt;
    newRoom.password = password ? newRoom.generateHash(password) : '';
    newRoom.creator = req.user._id;
    newRoom.users = [];

    try {
      const room = await newRoom.save();
      const roomJSON = await room.fetch();

      res.send(roomJSON);
    } catch (err) {
      logger.error(err.message);
      throw boom.internal('Internal');
    }
}));

router.put('/update/:id', authentication.isAuthenticated, authentication.isRoomCreator, asyncErrors(async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  if (!name)
    throw boom.badRequest('Missing body parameter(s)');

  try {
    const oldestRoom = await Room.findById(id);

    const updatedRoom = {
      name,
      password: password ? newRoom.generateHash(password) : oldestRoom.password,
    };

    const room = await Room.findByIdAndUpdate(id, updatedRoom, { new: true });
    const roomJSON = await room.fetch();

    res.send(roomJSON);
  } catch (err) {
    logger.error(err.message);
    throw boom.internal('Internal');
  }
}));

router.delete('/delete/:id', authentication.isAuthenticated, authentication.isRoomCreator, asyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const err = await Room.findByIdAndRemove(id);
    res.send("Success");
  }  catch (err) {
    logger.error(err.message);
    throw boom.internal('Internal');
  }
}));

// router.get('/all', authentication.isAuthenticated, () => {});

// router.get('/users', authentication.isAuthenticated, () => {});

// router.get('/:id', authentication.isAuthenticated, () => {});

module.exports = router;
