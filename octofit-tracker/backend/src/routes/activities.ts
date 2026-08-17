import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/activities/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { Activity } = await import('../models/Activity.js');
    const activities = await Activity.find();
    res.json({ message: 'Get all activities', data: activities });
  } catch (error: unknown) {
    console.error('[ERROR] Error fetching activities:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Failed to fetch activities', details: errorMessage });
  }
});

// GET /api/activities/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { Activity } = await import('../models/Activity.js');
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: `Get activity ${id}`, data: activity });
  } catch (error) {
    console.error('[ERROR] Error fetching activity:', error);
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST /api/activities/
router.post('/', async (req: Request, res: Response) => {
  try {
    const { Activity } = await import('../models/Activity.js');
    const activity = new Activity(req.body);
    const savedActivity = await activity.save();
    res.status(201).json({ message: 'Activity created', data: savedActivity });
  } catch (error) {
    console.error('[ERROR] Error creating activity:', error);
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// PUT /api/activities/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { Activity } = await import('../models/Activity.js');
    const { id } = req.params;
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json({ message: `Activity ${id} updated`, data: updatedActivity });
  } catch (error) {
    console.error('[ERROR] Error updating activity:', error);
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { Activity } = await import('../models/Activity.js');
    const { id } = req.params;
    const deletedActivity = await Activity.findByIdAndDelete(id);
    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('[ERROR] Error deleting activity:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
