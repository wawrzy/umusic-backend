const router = require('express').Router();

/**
 * Welcome api route
 */
router.get('/', (request, response) => {
  response.send('Umusic API v0.1');
});

module.exports = router;
