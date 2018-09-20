const router = require('express').Router();

router.use('/', require('./app'));
router.use('/auth', require('./auth'));

module.exports = router;
