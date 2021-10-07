const app = require('../../src');
const supertest = require("supertest");
const {openConnection, closeConnection} = require('../utils/setupDb');
const uniqid = require('uniqid');

describe('Urls endpoints unit tests', () => {
	beforeAll(async () => {
		await openConnection();
	});
	afterAll(async () => {
		await closeConnection();
	});
	describe('/api/encode should', () => {
		test('Return error when url is not provided in the body parameter', async () => {
			const response = await supertest(app).post("/api/encode", {});
			const {body, statusCode} = response;
			expect(statusCode).toBe(404);
			expect(body).toHaveProperty('error');
			expect(body.error).toEqual('url is a required body parameter.');
		});
		test('Return error when an already used url is provided in body parameter.', async () => {
			const response = await supertest(app).post("/api/encode").send({url: 'https://google.com'});
			const {body, statusCode} = response;
			expect(statusCode).toBe(409);
			expect(body).toHaveProperty('error');
			expect(body.error).toEqual('Url already exists. Try a new url.');
		});
		test('Return added url details when a new url is provided in the body parameter.', async () => {
			const response = await supertest(app).post("/api/encode").send({url: `https://google.com/${uniqid()}`});
			const {body, statusCode} = response;
			expect(statusCode).toBe(201);
			expect(body).toHaveProperty('url');
			expect(body).toHaveProperty('hash');
			expect(body).toHaveProperty('hashUrl');
		});
	});
});