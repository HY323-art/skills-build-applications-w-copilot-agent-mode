import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/leaderboard/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { Leaderboard } = await import('../models/Leaderboard.js');
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    res.json({ message: 'Get leaderboard', data: leaderboard });
  } catch (error: unknown) {
    console.error('[ERROR] Error fetching leaderboard:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: errorMessage });
  }
});

// GET /api/leaderboard/teams
router.get('/teams', async (_req: Request, res: Response) => {
  try {
    const { Leaderboard } = await import('../models/Leaderboard.js');
    const teamLeaderboard = await Leaderboard.find({ teamId: { $exists: true } }).sort({ rank: 1 });
    res.json({ message: 'Get team leaderboard', data: teamLeaderboard });
  } catch (error) {
    console.error('[ERROR] Error fetching team leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET /api/leaderboard/:userId
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { Leaderboard } = await import('../models/Leaderboard.js');
    const { userId } = req.params;
    const entry = await Leaderboard.findOne({ userId });
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    res.json({ message: `Get user ${userId} leaderboard position`, data: entry });
  } catch (error) {
    console.error('[ERROR] Error fetching leaderboard entry:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

export default router;
