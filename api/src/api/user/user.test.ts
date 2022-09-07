import request from 'supertest';

import app from '../../app';
import { Users } from './user.model';

/*beforeAll(async () => {
  try {
    await Users.drop();
  } catch (error) {}
});*/

describe('GET /api/v1/user', () => {
  it('responds with an user', (done) => {
    request(app)
      .get('/api/v1/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { name: "francis270" }, done);
  });
});
