const createUser = require('../helper').createUser;

const request = require('supertest');
const chai = require('chai');

const { joinRoom } = require('../../src/events/room');
const { disconnect } = require('../../src/events/disconnect');

const expect = chai.expect;

describe('Test rooms', () => {
  const users = [
    { email: "room@test.com", alias: "room", password: "test" },
    { email: "room1@test.com", alias: "room1", password: "test" }
  ]
  const roomWithoutPassword = {
    name: "roomWithoutPassword",
    id: null
  };
  const updatedRoomWithoutPassword = {
    name: "updatedRoomWithoutPassword",
  };
  let userToken = null;
  let otherUserToken = null;

  before(async () => {
    await mongoose.connection.dropDatabase();
  })

  it('should be login', async () => {
    await createUser(users[0]);
    await createUser(users[1]);

    const user1Test = await request(server)
      .post('/api/auth/signin')
      .send({ email: "room@test.com", password: "test" })
    const user2Test = await request(server)
      .post('/api/auth/signin')
      .send({ email: "room1@test.com", password: "test" })

    expect(user1Test.body.token).not.null;
    expect(user2Test.body.token).not.null;

    userToken = user1Test.body.token;
    otherUserToken = user2Test.body.token;
  });

  it('should not be authorized to create room', async () => {
    const roomTest = await request(server)
      .post('/api/room/create')
      .set('Authorization', "test")
      .send({ name: roomWithoutPassword.name })

    expect(roomTest.statusCode).to.be.equal(401);
  });

  it('should not be able to create room without name', async () => {
    const roomTest = await request(server)
      .post('/api/room/create')
      .set('Authorization', userToken)
      .send({})

    expect(roomTest.statusCode).to.be.equal(400);
  });

  it('should create room', async () => {
    const roomTest = await request(server)
      .post('/api/room/create')
      .set('Authorization', userToken)
      .send({ name: roomWithoutPassword.name })

    expect(roomTest.statusCode).to.be.equal(200);
    expect(roomTest.body.name).to.be.equal(roomWithoutPassword.name);
    expect(roomTest.body.creator.alias).to.be.equal(users[0].alias);
    expect(roomTest.body.creator.email).to.be.equal(users[0].email);
    expect(roomTest.body.users.length).to.be.equal(0);
    roomWithoutPassword.id = roomTest.body._id;
  });

  it('should be able to create room with the same name', async () => {
    const roomTest = await request(server)
      .post('/api/room/create')
      .set('Authorization', userToken)
      .send({ name: roomWithoutPassword.name })
    expect(roomTest.body.name).to.be.equal(roomWithoutPassword.name);
  });

  it('should not be able to update room with an other user', async () => {
    const roomTest = await request(server)
      .put(`/api/room/update/${roomWithoutPassword.id}`)
      .set('Authorization', otherUserToken)
      .send({ name: updatedRoomWithoutPassword.name })

    expect(roomTest.statusCode).to.be.equal(401);
  });

  it('should not be able to update inexisting room', async () => {
    const roomTest = await request(server)
      .put(`/api/room/update/ahah`)
      .set('Authorization', userToken)
      .send({ name: updatedRoomWithoutPassword.name })

    expect(roomTest.statusCode).to.be.equal(400);
  });

  it('should not be able to update room without name', async () => {
    const roomTest = await request(server)
      .put(`/api/room/update/${roomWithoutPassword.id}`)
      .set('Authorization', userToken)
      .send({})

    expect(roomTest.statusCode).to.be.equal(400);
  });

  it('should be able to update room', async () => {
    const roomTest = await request(server)
      .put(`/api/room/update/${roomWithoutPassword.id}`)
      .set('Authorization', userToken)
      .send({ name: updatedRoomWithoutPassword.name })

    expect(roomTest.statusCode).to.be.equal(200);
    expect(roomTest.body.name).to.be.equal(updatedRoomWithoutPassword.name);
    expect(roomTest.body.creator.alias).to.be.equal(users[0].alias);
    expect(roomTest.body.creator.email).to.be.equal(users[0].email);
    expect(roomTest.body.users.length).to.be.equal(0);
  });

  it('should not be able to get all rooms with bad token', async () => {
    const roomTest = await request(server)
      .get(`/api/room/all`)
      .set('Authorization', "token")
      .send()

    expect(roomTest.statusCode).to.be.equal(401);
  });

  it('should be able to get all rooms', async () => {
    const roomTest = await request(server)
      .get(`/api/room/all`)
      .set('Authorization', otherUserToken)
      .send()

    expect(roomTest.statusCode).to.be.equal(200);
    expect(roomTest.body.length).to.be.equal(2);
  });

  it('should not be able to get one specific room with a bad token', async () => {
    const roomTest = await request(server)
      .get(`/api/room/${roomWithoutPassword.id}`)
      .set('Authorization', "token")
      .send()

    expect(roomTest.statusCode).to.be.equal(401);
  });

  it('should be able to get one specific room with id', async () => {
    const roomTest = await request(server)
      .get(`/api/room/${roomWithoutPassword.id}`)
      .set('Authorization', otherUserToken)
      .send()

    expect(roomTest.statusCode).to.be.equal(200);
    expect(roomTest.body.name).to.be.equal(updatedRoomWithoutPassword.name);
    expect(roomTest.body.creator.alias).to.be.equal(users[0].alias);
    expect(roomTest.body.creator.email).to.be.equal(users[0].email);
    expect(roomTest.body.users.length).to.be.equal(0);
  });

  it('should be able to join room with id', async () => {
    await joinRoom("imasocket", socket, {
      roomId: roomWithoutPassword.id,
      authorization: otherUserToken,
      password: ''
    });

    const roomTest = await request(server)
    .get(`/api/room/join/${roomWithoutPassword.id}`)
    .set('Authorization', otherUserToken)
    .send()

    expect(roomTest.statusCode).to.be.equal(200);
  });

  it('should be able to leave room', async () => {
    await disconnect("imasocket");

    const roomTest = await request(server)
    .get(`/api/room/join/${roomWithoutPassword.id}`)
    .set('Authorization', otherUserToken)
    .send()

    expect(roomTest.statusCode).to.be.equal(200);
  });


  it('should not be able to delete room with an other user', async () => {
    const roomTest = await request(server)
      .delete(`/api/room/delete/${roomWithoutPassword.id}`)
      .set('Authorization', otherUserToken)
      .send()

    expect(roomTest.statusCode).to.be.equal(401);
  });
  
  it('should be able to delete room', async () => {
    const roomTest = await request(server)
      .delete(`/api/room/delete/${roomWithoutPassword.id}`)
      .set('Authorization', userToken)
      .send()

    expect(roomTest.statusCode).to.be.equal(200);
  });

  it('should not be able to join a deleted room', async () => {
    await joinRoom("imasocket", socket, {
      roomId: roomWithoutPassword.id,
      authorization: otherUserToken,
      password: ''
    });

    const roomTest = await request(server)
    .get(`/api/room/join/${roomWithoutPassword.id}`)
    .set('Authorization', otherUserToken)
    .send()

    expect(roomTest.statusCode).to.be.equal(401);
  });
});
