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
	describe('/api/decode should', () => {
		test('Return error when hash is not provided in query parameter', async () => {
			const response = await supertest(app).get("/api/decode");
			const {body, statusCode} = response;
			expect(statusCode).toBe(404);
			expect(body).toHaveProperty('error');
			expect(body.error).toEqual('hash is a required query parameter.');
		});
		test('Return error when invalid hash is provided in query parameter', async () => {
			const response = await supertest(app).get("/api/decode?hash=ajskajkak");
			const {body, statusCode} = response;
			expect(statusCode).toBe(404);
			expect(body).toHaveProperty('error');
			expect(body.error).toEqual('No url found for the entered hash.');
		});
		test('Return decoded url data when a hash is provided in query parameter', async () => {
			const response = await supertest(app).get("/api/decode?hash=3c27bmwkud97bk6");
			const {body, statusCode} = response;
			expect(statusCode).toBe(200);
			expect(body).toHaveProperty('url');
			expect(body).toHaveProperty('hashUrl');
		});
	});
});