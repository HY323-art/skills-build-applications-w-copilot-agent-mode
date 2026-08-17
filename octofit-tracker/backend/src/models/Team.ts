import { Schema, model } from 'mongoose';

interface ITeam {
  name: string;
  description: string;
  leader: string;
  members: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    leader: { type: String, required: true },
    members: [{ type: String }],
  },
  { timestamps: true }
);

export const Team = model<ITeam>('Team', teamSchema);
