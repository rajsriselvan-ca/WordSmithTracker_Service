import { IWord } from '../models/wordModel';
import Word from '../models/wordModel';

const wordResolvers = {
  Query: {
    getWords: async (_: unknown, { userId }: { userId: string }): Promise<IWord[]> => {
      try{
        return await Word.find({ userId });
      } catch(error){
        throw new Error(`getWords failed to fetch: ${error}`)
      }
      
    },
    getAllWords: async (): Promise<IWord[]> => {
      try{
        return await Word.find();
      } catch(error){
        throw new Error(`getAllWords failed to fetch: ${error}`)
      }
    },
  },
  Mutation: {   
    addWord: async (
      _: unknown,
      { userId, word, language, meaning, exampleSentence, createdAt }: IWord
    ): Promise<IWord> => {
      try{
      const existingWord = await Word.findOne({ userId, word });
      if (existingWord) throw new Error('Word already exists for this user.');
      const newWord = new Word({ userId, word, language, meaning, exampleSentence, createdAt });
      return await newWord.save();
      } catch(error){
        throw new Error(`addWord failed to fetch: ${error}`)
      }
    },
    deleteWord: async (_: unknown, { id }: { id: string }): Promise<boolean> => {
      try{
        const result = await Word.findByIdAndDelete(id);
        return !!result;
      } catch(error){
        throw new Error(`deleteWord failed to fetch: ${error}`)
      }
    },
    editWord: async (
      _: unknown,
      { id, ...updates }: { id: string; updates: Partial<IWord> }
    ): Promise<IWord | null> => {
      try{
        return await Word.findByIdAndUpdate(id, updates, { new: true });
      } catch(error){
        throw new Error(`editWord failed to fetch: ${error}`)
      }
    },
  },
};

export default wordResolvers;
