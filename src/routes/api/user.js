const router = require('express').Router();
const boom = require('boom');

const authentication = require('../../middlewares/authentication');
const asyncErrors = require('../../middlewares/error');
const Users = require('../../models/user').model;
const logger = require('../../config/winston');

/**
 * @api {post} /api/users/me
 * @apiName Get current profile
 * @apiGroup Users
 *
 * @apiSuccess (200) {String} alias  Alias of the user.
 * @apiSuccess (200) {String} unique id of the user.
 * @apiSuccess (200) {String} email of the user.
 */
router.get('/me', authentication.isAuthenticated, asyncErrors(async (req, res) => {
    try {
      const user = await Users.findById(req.user._id);
      const userJSON = await user.toJSON();

      res.send(userJSON);
    } catch (err) {
      logger.error(err.message);
      throw boom.internal('Internal');
    }
}));

/**
 * @api {get} /api/users?alias=alias
 * @apiParam {String} alias to search
 * @apiName Get users
 * @apiGroup Users
 *
 * @apiSuccess (200) {Object[]} users.
 */
router.get('/', authentication.isAuthenticated, asyncErrors(async (req, res) => {
  const alias = req.query.alias || '';

  try {
    const users = await Users.find({ alias : { '$regex' : alias, '$options' : 'i' } });

    res.send(users);
  } catch (err) {
    logger.error(err.message);
    throw boom.internal('Internal');
  }
}));


module.exports = router;
