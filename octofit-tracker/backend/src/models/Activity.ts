import { Schema, model } from 'mongoose';

interface IActivity {
  userId: string;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);
