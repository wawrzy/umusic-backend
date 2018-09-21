const router = require('express').Router();
const boom = require('boom');
const moment = require('moment');

const authentication = require('../../middlewares/authentication');
const asyncErrors = require('../../middlewares/error');
const Room = require('../../models/room').model;

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
      res.send({ name: room.name, createdAt: room.createdAt, creator: req.user.alias });
    } catch (err) {
      throw boom.internal(err.message);
    }
}));

// router.put('/update/:id', authentication.isAuthenticated, () => {});

// router.delete('/delete/:id', authentication.isAuthenticated, () => {});

// router.get('/all', authentication.isAuthenticated, () => {});

// router.get('/users', authentication.isAuthenticated, () => {});

// router.get('/:id', authentication.isAuthenticated, () => {});

module.exports = router;
