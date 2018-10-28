const router = require('express').Router();

router.use('/', require('./app'));
router.use('/auth', require('./auth'));
router.use('/room', require('./room'));
router.use('/chat', require('./chat'))

module.exports = router;
