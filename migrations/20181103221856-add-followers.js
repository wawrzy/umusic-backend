'use strict';

module.exports = {

  up(db, next) {
    db.collection('users').updateMany({}, { $set: { follow: [] } });
    next();
  },

  down(db, next) {
    db.collection('users').updateMany({}, { $unset: { follow: [] } });
    next();
  }

};