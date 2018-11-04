const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const modelHelpers = require('../helpers/model.js')

const userSchema = new mongoose.Schema();

userSchema.add({
  email: String,
  alias: String,
  password: String,
  token: String,
  expiration: Number,
  sockets: [String],
  follow: [String],
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
};

userSchema.method('toJSON', modelHelpers.toJSON);

const User = mongoose.model('User', userSchema);

exports.schema = userSchema;
exports.model = User;
