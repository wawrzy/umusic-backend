const router = require('express').Router();

const authentication = require('../../middlewares/authentication');

/**
 * @api {get} /api/ Welcome message
 * @apiName Welcome
 * @apiGroup Api
 *
 * @apiSuccess {String} Welcome message.
 */
router.get('/', (request, response) => {
  response.send('Umusic API v0.1');
});

module.exports = router;
