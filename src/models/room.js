const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const roomSchema = new mongoose.Schema();

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

roomSchema.add({
  name: String,
  users: [{ type : ObjectId, ref: 'User' }],
  password: String,
  createdAt: Number,
  creator: { type : ObjectId, ref: 'User' }
});

// TODO: Add chat in schema

roomSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

roomSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
};


const Room = mongoose.model('Room', roomSchema);

exports.schema = roomSchema;
exports.model = Room;
