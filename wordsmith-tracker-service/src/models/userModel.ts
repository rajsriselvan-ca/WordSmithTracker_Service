import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  dailyGoal: number;
  createdAt: string;
}

const userSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  dailyGoal: { type: Number, default: 1 },
  createdAt: { type: String, unique: true},
});

export default mongoose.model<IUser>('User', userSchema);
