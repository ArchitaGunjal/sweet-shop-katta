import { Router } from 'express';
import { 
  getSweets, 
  createSweet, 
  purchaseSweet, 
  restockSweet,
  searchSweets, // Import these
  updateSweet, 
  deleteSweet 
} from '../controllers/sweets.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

// 1. Search (Public) - MUST BE BEFORE /:id
router.get('/search', searchSweets);

// 2. Standard CRUD
router.get('/', getSweets);
router.post('/', authenticate, isAdmin, createSweet);

// 3. Inventory
router.post('/:id/purchase', authenticate, purchaseSweet);
router.post('/:id/restock', authenticate, isAdmin, restockSweet);

// 4. Update & Delete (Admin Protected)
router.put('/:id', authenticate, isAdmin, updateSweet);
router.delete('/:id', authenticate, isAdmin, deleteSweet);
// Public route
router.get('/', getSweets);

// Protected Admin route
// 1. Check if logged in (authenticate)
// 2. Check if admin (isAdmin)
router.post('/', authenticate, isAdmin, createSweet);

// Purchase (Authenticated User)
router.post('/:id/purchase', authenticate, purchaseSweet);

// Restock (Admin Only)
router.post('/:id/restock', authenticate, isAdmin, restockSweet);

export default router;