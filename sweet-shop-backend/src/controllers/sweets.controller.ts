import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const sweetSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
  image: z.string().optional(),
});

export const getSweets = async (req: Request, res: Response) => {
  const sweets = await prisma.sweet.findMany();
  res.json(sweets);
};

export const createSweet = async (req: Request, res: Response) => {
  try {
    const data = sweetSchema.parse(req.body);
    const sweet = await prisma.sweet.create({ data });
    res.status(201).json(sweet);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const purchaseSweet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // 1. Check current stock using a transaction or atomic update
    // We use atomic decrement for safety
    const sweet = await prisma.sweet.findUnique({ where: { id: Number(id) } });

    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    if (sweet.quantity <= 0) return res.status(400).json({ error: 'Out of stock' });

    // 2. Decrement
    const updated = await prisma.sweet.update({
      where: { id: Number(id) },
      data: { quantity: { decrement: 1 } }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Purchase failed' });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  try {
    const updated = await prisma.sweet.update({
      where: { id: Number(id) },
      data: { quantity: { increment: Number(quantity) } }
    });

    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: 'Sweet not found' });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  const { q } = req.query;
  const query = q as string;

  if (!query) return res.json([]);

  // Simple fuzzy search on name or category
  const results = await prisma.sweet.findMany({
    where: {
      OR: [
        { name: { contains: query } }, // Remove 'mode: insensitive' for SQLite compatibility if needed, but standard Prisma supports it usually.
        { category: { contains: query } }
      ]
    }
  });
  res.json(results);
};

export const updateSweet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await prisma.sweet.update({
      where: { id: Number(id) },
      data
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: 'Sweet not found' });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.sweet.delete({ where: { id: Number(id) } });
    res.json({ message: 'Sweet deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Sweet not found' });
  }
};