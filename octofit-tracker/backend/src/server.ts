import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

// Codespaces-aware API URL support
app.get('/api/config', (_req, res) => {
  const apiUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${port}`;
  res.json({ apiUrl, port });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

// Mount routers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    app.listen(port, '0.0.0.0', () => {
      const apiUrl = process.env.CODESPACE_NAME
        ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
        : `http://localhost:${port}`;
      console.log(`OctoFit backend running on ${apiUrl}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}

startServer();

export default app;
