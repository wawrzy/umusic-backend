'use strict';

// In this file you can configure migrate-mongo

// Get env variables
require('dotenv').config();

module.exports = {

  mongodb: {

    url: process.env.TEST,

    databaseName: "YOURDATABASENAME",

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
    }
  },

  migrationsDir: 'migrations',

  changelogCollectionName: 'changelog',

};