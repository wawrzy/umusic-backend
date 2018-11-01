const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const User = require('./user').model;

const roomSchema = new mongoose.Schema();

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

roomSchema.add({
  name: String,
  users: [{ type : ObjectId, ref: 'User' }],
  password: String,
  createdAt: Number,
  creator: { type : ObjectId, ref: 'User' },
  videos: [String],
});

// TODO: Add chat in schema

roomSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

roomSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
};

roomSchema.methods.fetch = async function () {
  try {
    const creator = await User.findById(this.creator);
    const users = await User.find({ _id: { $all: this.users }} );

    return {
      creator,
      users,
      name: this.name,
      createdAt: this.createdAt,
      _id: this._id,
    };
  } catch (err) {
    return null;
  }
}

const Room = mongoose.model('Room', roomSchema);

exports.schema = roomSchema;
exports.model = Room;
