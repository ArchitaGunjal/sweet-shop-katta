import request from 'supertest';
import { app } from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Clean up DB before running tests
beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /api/auth/login', () => {
  it('should login with valid credentials and return a token', async () => {
    // 1. Create a user first
    await request(app).post('/api/auth/register').send({
      email: 'login@test.com',
      password: 'password123'
    });

    // 2. Try to login
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@test.com',
      password: 'password123'
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toEqual('login@test.com');
  });

  it('should reject invalid password', async () => {
    // 1. Create user
    await request(app).post('/api/auth/register').send({
      email: 'wrongpass@test.com',
      password: 'password123'
    });

    // 2. Login with wrong pass
    const res = await request(app).post('/api/auth/login').send({
      email: 'wrongpass@test.com',
      password: 'wrongpassword'
    });

    expect(res.statusCode).toEqual(401);
  });

  it('should reject non-existent user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'ghost@test.com',
      password: 'password123'
    });

    expect(res.statusCode).toEqual(401);
  });
});