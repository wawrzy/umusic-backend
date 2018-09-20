const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema();

userSchema.add({
  email: String,
  alias: String,
  password: String,
  token: String,
  expiration: Number,
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
};

const User = mongoose.model('User', userSchema);

exports.schema = userSchema;
exports.model = User;
