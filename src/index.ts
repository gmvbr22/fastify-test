/* eslint-disable node/no-unpublished-import */
import fastify, {FastifyInstance, InjectOptions} from 'fastify';

export interface TestUnit {
  name: string;
  options: InjectOptions;
  expect: {
    statusCode?: number;
    body?: string;
    json?: unknown;
  };
}

export interface TestInterface {
  before?: (app: FastifyInstance) => Promise<unknown>;
  after?: () => Promise<unknown>;

  tests: TestUnit[];
}

export async function testRoutes(testI: TestInterface) {
  const app = fastify();

  beforeAll(async () => {
    if (testI.before !== undefined) {
      await testI!.before(app);
    }
    app.server.unref();
    await app.listen(0);
  });

  for (const testUnit of testI.tests) {
    test(testUnit.name, async () => {
      const response = await app.inject(testUnit.options);

      if (testUnit.expect.statusCode !== undefined) {
        expect(response.statusCode).toBe(testUnit.expect.statusCode);
      }
      if (testUnit.expect.body !== undefined) {
        expect(response.body).toBe(testUnit.expect.body);
      }
      if (testUnit.expect.json !== undefined) {
        expect(response.json()).toStrictEqual(testUnit.expect.json);
      }
    });
  }

  afterAll(async () => {
    await app.close();
    if (testI.after !== undefined) {
      await testI!.after();
    }
  });
}
