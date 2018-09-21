const router = require('express').Router();

router.use('/', require('./app'));
router.use('/auth', require('./auth'));
router.use('/room', require('./room'));

module.exports = router;
