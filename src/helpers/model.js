exports.toJSON = function() {
  const obj = this.toObject()

  obj.id = obj._id
  delete obj._id
  delete obj.__v
  delete obj.password
  delete obj.token
  delete obj.sockets

  return obj
}

