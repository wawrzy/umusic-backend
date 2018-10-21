const request = require('supertest');

const { server, mongoose } = require("../src/app");


before(() => {
  global.server = server;
  global.socket = { id: "imasocket", emit: () => {}, join: () => {} };
  dropDatabase();
});

after(() => {
  dropDatabase();
  delete global.server;
  delete global.socket;
});

beforeEach(() => {
  dropDatabase();
});

const dropDatabase = () => {
  mongoose.connection.on("connected", () => {
    mongoose.connection.db.dropDatabase();
  });
};

const createUser = async (user) => {
  await request(server)
    .post('/api/auth/signup')
    .send(user);
};

module.exports.createUser = createUser;
