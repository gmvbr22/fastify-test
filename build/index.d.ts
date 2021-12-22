import { FastifyInstance, InjectOptions } from 'fastify';
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
export declare function testRoutes(testI: TestInterface): Promise<void>;
