const request = require('supertest');
const { db, server } = require('../../src/app');
const mongoose = require('mongoose')

describe('Test auth', () => {


    it('should response with a bad request error (missing email)', async (done) => {
      const missingEmail = { password: "test", alias: "d" };

      request(server)
        .post('/api/auth/signup')
        .send(missingEmail)
        .expect(400)
        .end(done);

      });

    it('should response with a bad request error (missing password)', async (done) => {
      const missingPassword = { email: "test@test.com", alias: "test" };
 
      request(server)
        .post('/api/auth/signup')
        .send(missingPassword)
        .expect(400)
        .end(done);

    });

    it('should response with a bad request error (missing alias)', async (done) => {
      const missingAlias = { email: "test@test.com", password: "test" };

      request(server)
        .post('/api/auth/signup')
        .send(missingAlias)
        .expect(400)
        .end(done);
    });

    test('should response with a 200 status code', async (done) => {
      const user = { email: "test@test.com", alias: "test", password: "test" };

      if (db.connection.collections["users"])
        await db.connection.collections["users"].deleteOne()

      request(server)
        .post('/api/auth/signup')
        .send(user)
        .expect(200)
        .end(done);
    });


    afterAll((done) => {
      db.connection.close(() => server.close(done));
    })
});
