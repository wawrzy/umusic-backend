const createUser = require('../helper').createUser;

const request = require('supertest');
const chai = require('chai');

const { joinRoom } = require('../../src/events/room');
const { sendMessage } = require('../../src/events/chat');

const expect = chai.expect;

describe('Test chat', () => {
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

  it('should create room', async () => {
    const roomTest = await request(server)
      .post('/api/room/create')
      .set('Authorization', julienToken)
      .send({ name: room.name })

    expect(roomTest.statusCode).to.be.equal(200);
    room.id = roomTest.body._id;
  });


  it('should not be able to get messages to the room before join', async () => {
    await sendMessage(io, { ...socket, id: "fake"}, { message: "message", authorization: julienToken });

    const roomMessage = await request(server)
      .get(`/api/chat/messages/${room.id}`)
      .set('Authorization', julienToken)
      .send();
    
      expect(roomMessage.statusCode).to.be.equal(401);
  });

  it('should connect to the room', async () => {
    await joinRoom("juliensocket", { ...socket, id: "juliensocket"}, {
      roomId: room.id,
      authorization: julienToken,
      password: ''
    });
    await joinRoom("alexysocket", { ...socket, id: "alexysocket"}, {
      roomId: room.id,
      authorization: alexyToken,
      password: ''
    });

    const julienJoinTest = await request(server)
      .get(`/api/room/join/${room.id}`)
      .set('Authorization', julienToken)
      .send()

    const alexyJoinTest = await request(server)
      .get(`/api/room/join/${room.id}`)
      .set('Authorization', alexyToken)
      .send()

    expect(julienJoinTest.statusCode).to.be.equal(200);
    expect(alexyJoinTest.statusCode).to.be.equal(200);
  });

  it('should not be able to send message to the room with bad payload', async () => {
    await sendMessage(io, { ...socket, id: "juliensocket"}, { authorization: julienToken });

    const roomMessage = await request(server)
      .get(`/api/chat/messages/${room.id}`)
      .set('Authorization', julienToken)
      .send();
    
      expect(roomMessage.statusCode).to.be.equal(200);
      expect(roomMessage.body).to.be.an('array');
      expect(roomMessage.body.length).to.be.equal(0);
  });

  it('should not be able to get messages from bad room', async () => {
    const roomMessage = await request(server)
      .get(`/api/chat/messages/fake`)
      .set('Authorization', julienToken)
      .send();
    
      expect(roomMessage.statusCode).to.be.equal(400);
  });

  it('should send message to the room', async () => {
    await sendMessage(io, { ...socket, id: "juliensocket"}, { message: "message", authorization: julienToken });

    const roomMessage = await request(server)
      .get(`/api/chat/messages/${room.id}`)
      .set('Authorization', julienToken)
      .send();
    
      expect(roomMessage.statusCode).to.be.equal(200);
      expect(roomMessage.body).to.be.an('array');
      expect(roomMessage.body.length).to.be.equal(1);
    });

    it('should receive message from other user', async () => {
  
      const roomMessage = await request(server)
        .get(`/api/chat/messages/${room.id}`)
        .set('Authorization', alexyToken)
        .send();
      
        expect(roomMessage.statusCode).to.be.equal(200);
        expect(roomMessage.body).to.be.an('array');
        expect(roomMessage.body.length).to.be.equal(1);
      });

    it('should add video to the room', async () => {
      await sendMessage(io, { ...socket, id: "juliensocket"}, { message: "!video youtube?v=url", authorization: julienToken });
  
      const roomMessage = await request(server)
        .get(`/api/chat/messages/${room.id}`)
        .set('Authorization', julienToken)
        .send();
      
        expect(roomMessage.statusCode).to.be.equal(200);
        expect(roomMessage.body).to.be.an('array');
        expect(roomMessage.body.length).to.be.equal(2);
      });
});
