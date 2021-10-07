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
	describe('/api/statistic/:hash should', () => {
		test('Return error when invalid hash is provided in the path parameter', async () => {
			const response = await supertest(app).get("/api/statistic/ajskajkak");
			const {body, statusCode} = response;
			expect(statusCode).toBe(404);
			expect(body).toHaveProperty('error');
			expect(body.error).toEqual('No url found for the entered hash.');
		});
		test('Return all statistics when a correct hash is provided in the path parameter', async () => {
			const response = await supertest(app).get("/api/statistic/3c27bmwkud97bk6");
			const {body, statusCode} = response;
			expect(statusCode).toBe(200);
			expect(body).toHaveProperty('totalVisits');
			expect(body).toHaveProperty('visits');
			expect(body.visits).toBeInstanceOf(Array);
		});
	});
});