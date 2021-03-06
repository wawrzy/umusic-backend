const router = require('express').Router();
const passport = require('passport');

const authentication = require('../../middlewares/authentication');

const getToken = function(req, res) {
  if (req.user) {
    const { alias, email, token, _id } = req.user;
    res.send({ alias, email, token, _id });
  }
}

/**
 * @api {post} /api/auth/signup Signup
 * @apiName Signup
 * @apiGroup Auth
 *
 * @apiParam {String} alias  Alias of the User.
 * @apiParam {String} email  Email of the User.
 * @apiParam {String} password Password of the user
 * 
 * @apiSuccess (200) {String} alias  Alias of the User.
 * @apiSuccess (200) {String} email  Email of the User.
 * @apiSuccess (200) {String} _id  Unique id of the User.
 */
router.post('/signup', passport.authenticate('local-signup'), getToken)

/**
 * @api {post} /api/auth/signin Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} email  Email of the User.
 * @apiParam {String} password Password of the user
 * 
 * @apiSuccess (200) {String} alias  Alias of the User.
 * @apiSuccess (200) {String} email  Email of the User.
 * @apiSuccess (200) {String} _id  Unique id of the User.
 * @apiSuccess (200) {String} token  Authentification token of the User.
 */
router.post('/signin', passport.authenticate('local-login'), getToken)

module.exports = router;
