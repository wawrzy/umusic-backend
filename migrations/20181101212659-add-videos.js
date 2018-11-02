'use strict';

module.exports = {

  up(db, next) {
    db.collection('rooms').updateMany({}, { $set: { videos: [] } });
    next();
  },

  down(db, next) {
    db.collection('rooms').updateMany({}, { $unset: { videos: [] } });
    next();
  }

};
