import { ApolloError } from 'apollo-server';
import Language from '../models/languageModel'; 

export const getLanguages = async () => {
  try {
    return await Language.find(); 
  } catch (error) {
    throw new ApolloError('Error fetching languages');
  }
};

const resolvers = {
  Query: {
    getLanguages, 
  }
};

export default resolvers;
