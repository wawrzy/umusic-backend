const createUser = require('../helper').createUser;

const request = require('supertest');
const chai = require('chai');

const expect = chai.expect;

describe('Test users', () => {

  const users = [
    { email: "julien@test.com", alias: "julien", password: "test" },
    { email: "alexy@test.com", alias: "alexy", password: "test" },
  ]

  const room = {
    name: "Room",
    id: null,
  };
  let alexyToken = null;
  let julienToken = null;

  before(async () => {
    await mongoose.connection.dropDatabase();
  })

  it('should be login', async () => {
    await createUser(users[0]);
    await createUser(users[1]);

    const user1Test = await request(server)
      .post('/api/auth/signin')
      .send({ email: "julien@test.com", password: "test" })
    const user2Test = await request(server)
      .post('/api/auth/signin')
      .send({ email: "alexy@test.com", password: "test" })

    expect(user1Test.body.token).not.null;
    expect(user2Test.body.token).not.null;

    julienToken = user1Test.body.token;
    alexyToken = user2Test.body.token;
  });

  it('should get alexy profile', async () => {
    const profileAlexy = await request(server)
      .get('/api/users/me')
      .set('Authorization', alexyToken)
      .send()

      expect(profileAlexy.statusCode).to.be.equal(200);
      expect(profileAlexy.body.id).not.null;
      expect(profileAlexy.body.email).not.null;
      expect(profileAlexy.body.alias).to.be.equal('alexy');
  });

  it('should get julien profile', async () => {
    const users = await request(server)
      .get('/api/users?alias=julien')
      .set('Authorization', alexyToken)
      .send()

      expect(users.statusCode).to.be.equal(200);
      expect(users.body).to.be.an('array');
      expect(users.body.length).to.be.equal(1);
      expect(users.body[0].alias).to.be.equal('julien');
  });

  it('should update julien profile', async () => {
    const users = await request(server)
      .put('/api/users/me')
      .set('Authorization', julienToken)
      .send({ alias: "ok", email: "bojur@ju.com" });

      expect(users.statusCode).to.be.equal(200);
      expect(users.body.alias).to.be.equal('ok');
  });

  it('should not update julien profile with bad body', async () => {
    const users = await request(server)
      .put('/api/users/me')
      .set('Authorization', julienToken)
      .send({ alias: "ok" });

      expect(users.statusCode).to.be.equal(400);
  });

  it('should get all users', async () => {
    const users = await request(server)
      .get('/api/users')
      .set('Authorization', alexyToken)
      .send()

      expect(users.statusCode).to.be.equal(200);
      expect(users.body).to.be.an('array');
      expect(users.body.length).to.be.equal(2);
  });
});
