import {testRoutes} from '.';

describe('fastify-test', () => {
  testRoutes({
    async before(app) {
      app
        .get('/plain', async () => 'Hello world')
        .get('/success', async () => ({
          success: true,
        }))
        .get('/error', async (_, reply) => {
          reply.code(403);
          reply.send({success: true});
        });
    },
    async after() {},
    tests: [
      {
        name: 'Should expect status code [200] and body in plain text',
        options: {
          path: '/plain',
          method: 'GET',
        },
        expect: {
          statusCode: 200,
          body: 'Hello world',
        },
      },
      {
        name: 'Should expect status code [200] and body in json',
        options: {
          path: '/success',
          method: 'GET',
        },
        expect: {
          statusCode: 200,
          json: {success: true},
        },
      },
      {
        name: 'Should expect status code [403]',
        options: {
          path: '/error',
          method: 'GET',
        },
        expect: {
          statusCode: 403,
        },
      },
    ],
  });
});
