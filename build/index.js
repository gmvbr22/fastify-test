"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRoutes = void 0;
/* eslint-disable node/no-unpublished-import */
const fastify_1 = require("fastify");
async function testRoutes(testI) {
    const app = (0, fastify_1.default)();
    beforeAll(async () => {
        if (testI.before !== undefined) {
            await testI.before(app);
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
            await testI.after();
        }
    });
}
exports.testRoutes = testRoutes;
//# sourceMappingURL=index.js.map