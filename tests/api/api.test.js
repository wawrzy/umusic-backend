require('../helper');

const request = require('supertest');
const chai = require('chai');

const expect = chai.expect;

describe('Test the welcome api message', () => {
    it('It should response with a 200 status code', async () => {
       const response = await request(server).get('/api');
       expect(response.statusCode).to.equal(200);        
    });

})