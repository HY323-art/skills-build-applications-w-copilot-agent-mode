import { Schema, model } from 'mongoose';

interface ILeaderboard {
  userId: string;
  teamId?: string;
  points: number;
  rank: number;
  updatedAt?: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: String, required: true, unique: true },
    teamId: { type: String },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema);
