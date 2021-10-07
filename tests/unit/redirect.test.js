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
	describe('/:hash should', () => {
		test('Return error when an invalid hash is used the path parameter.', async () => {
			const response = await supertest(app).get("/3c27bmwkud97bk6a");
			const {body, statusCode} = response;
			expect(statusCode).toBe(404);
			expect(body).toHaveProperty('error');
			expect(body.error).toEqual('No url found for the entered hash.');
		});
		test('Redirects to original url when correct hash is used the path parameter.', async () => {
			const response = await supertest(app).get("/3c27bmwkud97bk6");
			let status = response.statusCode;
			if (status === 302) {
				status = 302
			}
			expect(status).toBe(302);
		});
	});
});