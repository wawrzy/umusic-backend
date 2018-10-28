const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema();

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

chatSchema.add({
  message: String,
  sender: { type : ObjectId, ref: 'User' },
  createdAt: Number,
  roomId: { type : ObjectId, ref: 'Room' },
});

const Chat = mongoose.model('Chat', chatSchema);

exports.schema = chatSchema;
exports.model = Chat;
