import mongoose, { Schema, Document } from 'mongoose';

export interface IWord extends Document {
  userId: string;
  word: string;
  language: string;
  meaning: string;
  exampleSentence: string;
  createdAt: string;                                          
}

const wordSchema: Schema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  word: { type: String, required: true },
  language: { type: String, required: true },
  meaning: { type: String, required: true },
  exampleSentence: { type: String, required: true },
  createdAt: { type: String, required: true },
});

export default mongoose.model<IWord>('Word', wordSchema);
