const router = require('express').Router();
const boom = require('boom');
const moment = require('moment');

const authentication = require('../../middlewares/authentication');
const asyncErrors = require('../../middlewares/error');
const Room = require('../../models/room').model;
const logger = require('../../config/winston');

/**
 * @api {post} /api/room/create Create Room
 * @apiName Create
 * @apiGroup Rooms
 *
 * @apiParam {String} name  Name of the room.
 * @apiParam {String} password='' Password of the room.
 * 
 * @apiSuccess (200) {String} name  Name of the room.
 * @apiSuccess (200) {Date} createdAt  Creation date.
 * @apiSuccess (200) {Object} creator  Creator informations.
 * @apiSuccess (200) {Object[]} users  Users informations.
 */
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

/**
 * @api {put} /api/room/update/:id Room unique ID.
 * @apiName Update
 * @apiGroup Rooms
 *
 * @apiParam {String} name  Name of the room.
 * @apiParam {String} password Password of the room (not mandatory).
 * 
 * @apiSuccess (200) {String} name  Name of the room.
 * @apiSuccess (200) {Date} createdAt  Creation date.
 * @apiSuccess (200) {Object} creator  Creator informations.
 * @apiSuccess (200) {Object[]} users  Users informations.
 */
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

/**
 * @api {delete} /api/room/delete/:id Room unique ID.
 * @apiName Delete
 * @apiGroup Rooms
 *
 * @apiSuccess (200) Success.
 */
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

/**
 * @api {get} /api/room/all
 * @apiName Get all
 * @apiGroup Rooms
 *
 * @apiSuccess (200) {Object[]}  Rooms informations.
 */
router.get('/all', authentication.isAuthenticated, asyncErrors(async (req, res) => {
  try {
    Room.find({ password: '' })
      .select('users creator createdAt name')
      .populate('creator')
      .populate('users')
      .exec((err, data) => {
        if (err)
          throw err;
        res.send(data);
      })
  } catch (err) {
    logger.error(err.message);
    throw boom.internal('Internal');
  }
}));

/**
 * @api {get} /api/room/:id Room unique ID.
 * @apiName Get one
 * @apiGroup Rooms
 *
 * @apiSuccess (200) {String} name  Name of the room.
 * @apiSuccess (200) {String} _id  Unique ID of the room.
 * @apiSuccess (200) {Date} createdAt  Creation date.
 * @apiSuccess (200) {Object} creator  Creator informations.
 * @apiSuccess (200) {Object[]} users  Users informations.
 */
router.get('/:id', authentication.isAuthenticated, asyncErrors(async (req, res) => {
  const { id } = req.params;

  if (!id)
    throw boom.badRequest('Missing id');

  try {
    Room.findById(id)
      .select('users creator createdAt name')
      .populate('creator')
      .populate('users')
      .exec((err, data) => {
        if (err)
          throw err;
        res.send(data);
      })
  } catch (err) {
    logger.error(err.message);
    throw boom.internal('Internal');
  }
}));

/**
 * @api {get} /api/room/join/:id Room unique ID.
 * @apiName Join room
 * @apiGroup Rooms
 *
 * @apiSuccess (200) {String} status  State of connection (always "connected").
 */
router.get('/join/:id', authentication.isAuthenticated, authentication.isInRoom, asyncErrors(async (req, res) => {
  res.send({ status: "connected" });
}))

module.exports = router;
