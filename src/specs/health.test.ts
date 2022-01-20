import request from 'supertest';
import pool from '../db/pool';
import app from '../server/app';

describe('GET /health - a simple api endpoint', () => {
  const agent = request.agent(app);

  it('Health 200 API Request', async () => {
    const result = await agent.get('/health');

    expect(result.text).toEqual('OK');
    expect(result.statusCode).toEqual(200);
  });

  it('Health 500 API Request', async () => {
    // database connection must be ended last
    // you must end database after all tests have run or in the last test
    pool.end();
    const result = await agent.get('/health');

    expect(JSON.parse(result.text).message).toEqual('Internal Server Error');
    expect(result.statusCode).toEqual(500);
  });
});
