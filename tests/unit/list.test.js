const app = require('../../src');
const supertest = require("supertest");
const {openConnection, closeConnection} = require('../utils/setupDb');

describe('Urls endpoints unit tests', () => {
	beforeAll(async () => {
		await openConnection();
	});
	afterAll(async () => {
		await closeConnection();
	});
	describe('/api/list should', () => {
		test('Return all records in the URL table.', async () => {
			const response = await supertest(app).get("/api/list");
			const {body, status} = response;
			expect(status).toBe(200);
			expect(body).toBeInstanceOf(Array)
		});
	});
});