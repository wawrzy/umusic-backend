const _ = require('lodash');
const jwt = require('jwt-simple');

const UserModel = require('../models/user').model;

exports.checkJSON = (json, keys) => {
  const jsonKeys = _.keysIn(json);

  return _.isEqual(jsonKeys.sort(), keys.sort());
};

exports.checkAuthorization = async (token) => {
  if (!token)
    return null;

  const decoded = jwt.decode(token, 'UMUSIC_TOKEN_SECRET')

  if (decoded.exp <= Date.now())
    return null;

  const user = await UserModel.findOne({ _id: decoded.iss })

  return user;
}