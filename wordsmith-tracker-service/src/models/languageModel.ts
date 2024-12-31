import mongoose, { Schema, Document } from 'mongoose';

export interface ILanguage extends Document {
  name: string;
}

const LanguageSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<ILanguage>('Language', LanguageSchema);
