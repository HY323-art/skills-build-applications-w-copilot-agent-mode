import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/teams/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { Team } = await import('../models/Team.js');
    const teams = await Team.find();
    res.json({ message: 'Get all teams', data: teams });
  } catch (error: unknown) {
    console.error('[ERROR] Error fetching teams:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Failed to fetch teams', details: errorMessage });
  }
});

// GET /api/teams/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { Team } = await import('../models/Team.js');
    const { id } = req.params;
    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: `Get team ${id}`, data: team });
  } catch (error) {
    console.error('[ERROR] Error fetching team:', error);
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// POST /api/teams/
router.post('/', async (req: Request, res: Response) => {
  try {
    const { Team } = await import('../models/Team.js');
    const team = new Team(req.body);
    const savedTeam = await team.save();
    res.status(201).json({ message: 'Team created', data: savedTeam });
  } catch (error) {
    console.error('[ERROR] Error creating team:', error);
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// PUT /api/teams/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { Team } = await import('../models/Team.js');
    const { id } = req.params;
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: `Team ${id} updated`, data: updatedTeam });
  } catch (error) {
    console.error('[ERROR] Error updating team:', error);
    res.status(400).json({ error: 'Failed to update team' });
  }
});

// DELETE /api/teams/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { Team } = await import('../models/Team.js');
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('[ERROR] Error deleting team:', error);
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
