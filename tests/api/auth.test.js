require('../helper');

const request = require('supertest');
const chai = require('chai');

const expect = chai.expect;

describe('Test auth', () => {

    it('should response with a bad request error (missing email)', async () => {
      const missingEmail = { password: "test", alias: "d" };

      const response = await request(server)
        .post('/api/auth/signup')
        .send(missingEmail);

      expect(response.statusCode).to.equal(400);
    });

    it('should response with a bad request error (missing password)', async () => {
      const missingPassword = { email: "test@test.com", alias: "test" };
 
      const response = await request(server)
        .post('/api/auth/signup')
        .send(missingPassword);

      expect(response.statusCode).to.equal(400);
    });

    it('should response with a bad request error (missing alias)', async () => {
      const missingAlias = { email: "test@test.com", password: "test" };

      const response = await request(server)
        .post('/api/auth/signup')
        .send(missingAlias);

      expect(response.statusCode).to.equal(401);
    });

  it('should response with a 200 status code', async () => {
    const user = { email: "test@test.com", alias: "test", password: "test" };

    const response = await request(server)
      .post('/api/auth/signup')
      .send(user);

    expect(response.body.email).to.equal("test@test.com");
    expect(response.body.alias).to.equal("test");
    expect(response.statusCode).to.equal(200);
  });

  it('should already exist', async () => {
    const user = { email: "test@test.com", alias: "test", password: "test" };

    const response = await request(server)
      .post('/api/auth/signup')
      .send(user);

    expect(response.statusCode).to.equal(401);
  });

  it('should be login', async () => {
    const user = { email: "test@test.com", password: "test" };

    const response = await request(server)
      .post('/api/auth/signin')
      .send(user);

    expect(response.body.token).to.not.empty;
    expect(response.body.email).to.equal("test@test.com");
    expect(response.body.alias).to.equal("test");
    expect(response.statusCode).to.equal(200);
  });

});
