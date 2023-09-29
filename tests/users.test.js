const request = require('supertest');
const app = require('../app');
const { json } = require('express');

require('dotenv').config();

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(201);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('POST /users/new', () => {
    it('should add a user', async () => {
        const res = await request(app).post('/users/new').send({
            "name": 'Vasilisa Lanister',
            "email": 'tvas_lan@test.com',
            "gender": 'female',
            "status": 'active'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBe('tvas_lan@test.com');
    });
});

describe('GET /users/:id', () => {
    it('should return user with correct id', async() => {
        const res = await request(app).get('/users/1407473');
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            "id": 1407473,
            "name": "Luisa",
            "email": "tlili@test.com",
            "gender": "female",
            "status": "active"
        });
    });
});

describe('PUT /users/:id', () => {
    it('should return changed user', async() => {
        const res = await request(app).put('/users/1407473').send({name: 'Melissa', email: 'ML@carter.test'});
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Melissa');
        expect(res.body.email).toBe('ML@carter.test');
    });
});

describe('DELETE /user/:id', () => {
    it('should delete user', async() => {
        const res = await request(app).delete('/users/1407473');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('User deleted');
    });
});
