import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('Cleared existing collections');

    // Create sample users
    const users = await User.insertMany([
      {
        username: 'alice_runner',
        email: 'alice@example.com',
        password: 'hashed_password_1',
        firstName: 'Alice',
        lastName: 'Johnson',
        profileImage: 'https://example.com/alice.jpg',
      },
      {
        username: 'bob_cyclist',
        email: 'bob@example.com',
        password: 'hashed_password_2',
        firstName: 'Bob',
        lastName: 'Smith',
        profileImage: 'https://example.com/bob.jpg',
      },
      {
        username: 'charlie_swimmer',
        email: 'charlie@example.com',
        password: 'hashed_password_3',
        firstName: 'Charlie',
        lastName: 'Brown',
        profileImage: 'https://example.com/charlie.jpg',
      },
      {
        username: 'diana_lifter',
        email: 'diana@example.com',
        password: 'hashed_password_4',
        firstName: 'Diana',
        lastName: 'Davis',
        profileImage: 'https://example.com/diana.jpg',
      },
      {
        username: 'evan_yogi',
        email: 'evan@example.com',
        password: 'hashed_password_5',
        firstName: 'Evan',
        lastName: 'Wilson',
        profileImage: 'https://example.com/evan.jpg',
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create sample teams
    const teams = await Team.insertMany([
      {
        name: 'The Runners',
        description: 'A team dedicated to running and marathons',
        leader: users[0]._id.toString(),
        members: [users[0]._id.toString(), users[1]._id.toString()],
      },
      {
        name: 'Cycle Club',
        description: 'Cycling enthusiasts from all levels',
        leader: users[1]._id.toString(),
        members: [users[1]._id.toString(), users[3]._id.toString()],
      },
      {
        name: 'Fitness Warriors',
        description: 'Strength training and bodybuilding team',
        leader: users[3]._id.toString(),
        members: [users[3]._id.toString(), users[2]._id.toString(), users[4]._id.toString()],
      },
    ]);
    console.log(`Created ${teams.length} teams`);

    // Create sample activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Running',
        duration: 45,
        distance: 7.5,
        calories: 650,
        notes: 'Morning jog at the park',
      },
      {
        userId: users[1]._id.toString(),
        type: 'Cycling',
        duration: 60,
        distance: 25,
        calories: 800,
        notes: 'Mountain biking trail',
      },
      {
        userId: users[2]._id.toString(),
        type: 'Swimming',
        duration: 30,
        distance: 1.5,
        calories: 400,
        notes: 'Lap swimming session',
      },
      {
        userId: users[3]._id.toString(),
        type: 'Weightlifting',
        duration: 75,
        calories: 500,
        notes: 'Upper body workout',
      },
      {
        userId: users[4]._id.toString(),
        type: 'Yoga',
        duration: 50,
        calories: 250,
        notes: 'Vinyasa flow session',
      },
      {
        userId: users[0]._id.toString(),
        type: 'Running',
        duration: 35,
        distance: 5.2,
        calories: 480,
        notes: 'Evening run',
      },
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create sample leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id.toString(),
        teamId: teams[0]._id.toString(),
        points: 1850,
        rank: 1,
      },
      {
        userId: users[1]._id.toString(),
        teamId: teams[1]._id.toString(),
        points: 1620,
        rank: 2,
      },
      {
        userId: users[3]._id.toString(),
        teamId: teams[2]._id.toString(),
        points: 1450,
        rank: 3,
      },
      {
        userId: users[2]._id.toString(),
        teamId: teams[2]._id.toString(),
        points: 1200,
        rank: 4,
      },
      {
        userId: users[4]._id.toString(),
        teamId: teams[2]._id.toString(),
        points: 950,
        rank: 5,
      },
    ]);
    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);

    // Create sample workouts
    const workouts = await Workout.insertMany([
      {
        name: 'Beginner Full Body',
        description: 'A complete full body workout for beginners',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: 10 },
          { name: 'Squats', sets: 3, reps: 15 },
          { name: 'Plank', sets: 3, reps: 30 },
          { name: 'Lunges', sets: 3, reps: 12 },
        ],
        difficulty: 'beginner',
      },
      {
        name: 'Intermediate Upper Body',
        description: 'Advanced upper body strengthening workout',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Rows', sets: 4, reps: 10 },
          { name: 'Shoulder Press', sets: 3, reps: 10 },
          { name: 'Pull-ups', sets: 4, reps: 6 },
        ],
        difficulty: 'intermediate',
      },
      {
        name: 'Advanced Lower Body',
        description: 'Intense lower body training for advanced athletes',
        exercises: [
          { name: 'Squats', sets: 5, reps: 5 },
          { name: 'Deadlifts', sets: 4, reps: 3 },
          { name: 'Leg Press', sets: 4, reps: 8 },
          { name: 'Leg Curls', sets: 3, reps: 10 },
        ],
        difficulty: 'advanced',
      },
      {
        name: 'Cardio & Core',
        description: 'High-intensity cardio with core strengthening',
        exercises: [
          { name: 'Burpees', sets: 3, reps: 15 },
          { name: 'Mountain Climbers', sets: 3, reps: 20 },
          { name: 'Russian Twists', sets: 3, reps: 20 },
          { name: 'Jump Squats', sets: 3, reps: 15 },
        ],
        difficulty: 'intermediate',
      },
    ]);
    console.log(`Created ${workouts.length} workouts`);

    console.log('\n✅ Database seeding complete');
    console.log('Seed data summary:');
    console.log(`  - Users: ${users.length}`);
    console.log(`  - Teams: ${teams.length}`);
    console.log(`  - Activities: ${activities.length}`);
    console.log(`  - Leaderboard entries: ${leaderboardEntries.length}`);
    console.log(`  - Workouts: ${workouts.length}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
