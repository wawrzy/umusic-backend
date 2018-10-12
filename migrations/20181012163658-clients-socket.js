'use strict';

module.exports = {

  up(db, next) {
    db.collection('rooms').updateMany({}, { $set: { clients: [] } });
    next();
  },

  down(db, next) {
    db.collection('rooms').updateMany({}, { $set: { clients: [] } });
    next();
  }

};