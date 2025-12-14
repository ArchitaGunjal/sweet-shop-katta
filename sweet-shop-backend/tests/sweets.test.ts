import request from 'supertest';
import { app } from '../src/app';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Helper to generate a token without making an API call
const generateToken = (role: string) => {
  return jwt.sign({ userId: 1, role }, process.env.JWT_SECRET || 'secret');
};

// Define tokens globally so they are available in all describe blocks
const adminToken = generateToken('admin');
const userToken = generateToken('user');

beforeAll(async () => {
  // Clean up database before starting
  await prisma.sweet.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Sweets API', () => {
  it('GET /api/sweets should return empty array initially', async () => {
    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/sweets should fail for non-admin user', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Forbidden Gummy',
        price: 5.00,
        quantity: 10,
        category: 'Gummies'
      });
    expect(res.statusCode).toEqual(403);
  });

  it('POST /api/sweets should succeed for Admin', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Super Sour Worms',
        price: 2.50,
        quantity: 100,
        category: 'Sour'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Super Sour Worms');
  });
});

describe('Inventory Logic', () => {
  let sweetId: number;

  // Create a specific sweet for testing inventory logic
  beforeAll(async () => {
    const sweet = await prisma.sweet.create({
      data: {
        name: 'Test Lollipop',
        category: 'Hard Candy',
        price: 1.00,
        quantity: 1 // Only 1 in stock!
      }
    });
    sweetId = sweet.id;
  });

  it('POST /:id/purchase should decrease stock', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.quantity).toEqual(0); // 1 - 1 = 0
  });

  it('POST /:id/purchase should fail if out of stock', async () => {
    // Stock is now 0 from previous test
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toMatch(/out of stock/i);
  });

  it('POST /:id/restock should be Admin only', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set('Authorization', `Bearer ${userToken}`) // Normal user
      .send({ quantity: 10 });

    expect(res.statusCode).toEqual(403);
  });

  it('POST /:id/restock should increase stock for Admin', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ quantity: 50 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.quantity).toEqual(50); // 0 + 50 = 50
  });
});

describe('CRUD & Search Operations', () => {
  let searchId: number;

  // Create a specific sweet for testing Search/Update/Delete
  beforeAll(async () => {
    const s = await prisma.sweet.create({
      data: { name: 'SearchMe', category: 'Search', price: 10, quantity: 5 }
    });
    searchId = s.id;
  });

  // --- Search Tests ---
  it('GET /api/sweets/search should filter by query', async () => {
    const res = await request(app).get('/api/sweets/search?q=SearchMe');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toEqual('SearchMe');
  });

  // --- Update Tests ---
  it('PUT /api/sweets/:id should update details (Admin)', async () => {
    const res = await request(app)
      .put(`/api/sweets/${searchId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: 99.99 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.price).toEqual(99.99);
  });

  it('PUT /api/sweets/:id should fail for non-admin', async () => {
    const res = await request(app)
      .put(`/api/sweets/${searchId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ price: 0 });

    expect(res.statusCode).toEqual(403);
  });

  // --- Delete Tests ---
  it('DELETE /api/sweets/:id should delete item (Admin)', async () => {
    const res = await request(app)
      .delete(`/api/sweets/${searchId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    
    // Verify it's gone
    const check = await prisma.sweet.findUnique({ where: { id: searchId } });
    expect(check).toBeNull();
  });
});