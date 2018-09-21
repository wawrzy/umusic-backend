const jwt = require('jwt-simple')
const boom = require('boom')

const UserModel = require('../models/user').model
const asyncErrors = require('./error');

exports.isAuthenticated = asyncErrors(async (req, res, next) => {
  const token = exports.retrieveToken(req)

  if (token) {
    try {
      const decoded = jwt.decode(token, 'UMUSIC_TOKEN_SECRET')

      if (decoded.exp <= Date.now()) {
        throw boom.unauthorized('Token has expired');
      }

      const user = await UserModel.findOne({ _id: decoded.iss })
      if (user) {
        req.user = user
        return next()
      } else {
        throw boom.unauthorized('User associated with token was not found');
      }
    } catch (err) {
      if (!err.isBoom) {
        throw boom.unauthorized('User associated with token was not found');
      }
      res.status(err.output.statusCode).send(err.output.payload);
    }
  } else {
    throw boom.unauthorized('Token is missing');
  }
});

exports.retrieveToken = (req) => req.headers['authorization'];
