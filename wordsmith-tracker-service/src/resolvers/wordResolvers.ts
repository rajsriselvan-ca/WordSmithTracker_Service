import { IWord } from '../models/wordModel';
import Word from '../models/wordModel';

const wordResolvers = {
  Query: {
    getWords: async (
      _: unknown,
      { userId, page = 1, limit = 4 }: { userId: string; page?: number; limit?: number }
    ): Promise<{ words: IWord[]; total: number }> => {
      try {
        const total = await Word.countDocuments({ userId }); 
        const words = await Word.find({ userId })
          .skip((page - 1) * limit)
          .limit(limit);
        return { words, total };
      } catch (error) {
        throw new Error(`getWords failed to fetch: ${error}`);
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
      if (existingWord) throw new Error('WordAlreadyExists');
      const newWord = new Word({ userId, word, language, meaning, exampleSentence, createdAt });
      return await newWord.save();
      } catch (error){
        if (error instanceof Error) {
        if (error.message === 'WordAlreadyExists') {
          throw new Error('Word Already Exists');
        }
      }
        throw new Error(`An unexpected error occured while creating a new word.`)
      }
    },
    deleteWord: async (_: unknown, { id }: { id: string }): Promise<boolean> => {
      try{
        const result = await Word.findByIdAndDelete(id);
        return !!result;
      } catch(error){
        throw new Error(`Failed to Delete the Word: ${error}`)
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
