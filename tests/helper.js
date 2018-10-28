const request = require('supertest');

const { server, mongoose } = require("../src/app");

before(() => {
  global.server = server;
  global.socket = { id: "imasocket", emit: () => {}, join: () => {} };
  global.io = { to: () => ({ emit: () => {} }) };
  global.mongoose = mongoose;
});

after(() => {
  delete global.server;
  delete global.socket;
});


const createUser = async (user) => {
  await request(server)
    .post('/api/auth/signup')
    .send(user);
};

module.exports.createUser = createUser;
