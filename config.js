'use strict';

// In this file you can configure migrate-mongo

// Get env variables
require('dotenv').config();

module.exports = {

  mongodb: {

    url: process.env.DATABASE_URL || 'mongodb://localhost:27017',

    databaseName: "umusic",

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
    }
  },

  migrationsDir: 'migrations',

  changelogCollectionName: 'changelog',

};