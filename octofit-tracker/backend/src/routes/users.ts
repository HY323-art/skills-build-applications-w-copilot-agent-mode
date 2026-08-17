import { Router, Request, Response } from 'express';

const router = Router();

// Test route first
router.get('/test', (_req: Request, res: Response) => {
  res.json({ message: 'Users route test' });
});

// GET /api/users/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { User } = await import('../models/User.js');
    console.log('[DEBUG] User model imported successfully');
    const users = await User.find();
    console.log('[DEBUG] Users fetched:', users.length);
    res.json({ message: 'Get all users', data: users });
  } catch (error: unknown) {
    console.error('[ERROR] Error fetching users:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Failed to fetch users', details: errorMessage });
  }
});

// GET /api/users/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { User } = await import('../models/User.js');
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: `Get user ${id}`, data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users/
router.post('/', async (req: Request, res: Response) => {
  try {
    const { User } = await import('../models/User.js');
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({ message: 'User created', data: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { User } = await import('../models/User.js');
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: `User ${id} updated`, data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { User } = await import('../models/User.js');
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
