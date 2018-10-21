'use strict';

module.exports = {

  up(db, next) {
    db.collection('users').updateMany({}, { $set: { sockets: [] } });
    next();
  },

  down(db, next) {
    db.collection('users').updateMany({}, { $set: { sockets: [] } });
    next();
  }

};