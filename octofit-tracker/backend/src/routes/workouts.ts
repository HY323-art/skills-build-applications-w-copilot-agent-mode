import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/workouts/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { Workout } = await import('../models/Workout.js');
    const workouts = await Workout.find();
    res.json({ message: 'Get all workouts', data: workouts });
  } catch (error: unknown) {
    console.error('[ERROR] Error fetching workouts:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Failed to fetch workouts', details: errorMessage });
  }
});

// GET /api/workouts/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { Workout } = await import('../models/Workout.js');
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: `Get workout ${id}`, data: workout });
  } catch (error) {
    console.error('[ERROR] Error fetching workout:', error);
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST /api/workouts/
router.post('/', async (req: Request, res: Response) => {
  try {
    const { Workout } = await import('../models/Workout.js');
    const workout = new Workout(req.body);
    const savedWorkout = await workout.save();
    res.status(201).json({ message: 'Workout created', data: savedWorkout });
  } catch (error) {
    console.error('[ERROR] Error creating workout:', error);
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// PUT /api/workouts/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { Workout } = await import('../models/Workout.js');
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: `Workout ${id} updated`, data: updatedWorkout });
  } catch (error) {
    console.error('[ERROR] Error updating workout:', error);
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { Workout } = await import('../models/Workout.js');
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('[ERROR] Error deleting workout:', error);
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
