const request = require('supertest');
const { server, db } = require('../../src/app');
const mongoose = require('mongoose');

describe('Test the welcome api message', () => {
    it('It should response with a 200 status code', (done) => {
        
       request(server)
        .get('/api')
        .expect(200)
        .end(() => done());

    });

    afterAll((done) => {
        db.connection.close(() => server.close(done));

    })
});

