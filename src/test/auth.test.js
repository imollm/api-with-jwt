'use strict'

const app = require('../server')
const request = require('supertest')
const MongoDBClient = require('../db')
const helpers = require('../helpers')

describe('Auth API tests', () => {
    let mongodb

    beforeAll(async () => {
        mongodb = new MongoDBClient()
        await mongodb.connect()
        await helpers.resetDB('users')
    })

    afterAll(async () => {
        await mongodb.disconnect()
    })

    describe('POST /api/v1/auth/register', () => {
        const newUser = {
            firstName: 'Test',
            lastName: 'Test',
            email: 'test@test.com',
            password: '12345678',
        }

        test('201 Created - Create new user', async () => {
            const response = await request(app).post('/api/v1/auth/register')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /json/)

            expect(response.body).toEqual(
                expect.objectContaining({
                    status: expect.toEqual(true),
                    message: expect.toBe('User has been created!'),
                    data: expect.objectContaining({
                        _id: expect.any(String),
                        firstName: expect.toBe('Test'),
                        lastName: expect.toBe('Test'),
                        email: expect.toBe('test@test.com'),
                        createdAt: expect.any(String)
                    })
                })
            )
        })

        test('409 Conflict - User already exists', async () => {
            const response = await request(app).post('/api/v1/auth/register')
                .send(newUser)
                .expect(409)
                .expect('Content-Type', /json/)

            expect(response.body).objectContaining({
                status: expect.toBe(false),
                message: expect.toBe('User already exists!')
            })
        })
    })
})