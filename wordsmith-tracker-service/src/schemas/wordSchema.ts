import { gql } from 'apollo-server-express';

const wordSchema = gql`
  type Word {
    id: ID!
    userId: String!
    word: String!
    language: String!
    meaning: String!
    exampleSentence: String!
    createdAt: String!
  }
  
  type PaginatedWords {
  words: [Word!]!
  total: Int!
}

  type Query {
    getWords(userId: String!, page: Int, limit: Int): PaginatedWords!
    getAllWords: [Word!]!
  }

  type Mutation {
    addWord(
      userId: String!
      word: String!
      language: String!
      meaning: String!
      exampleSentence: String!
      createdAt: String!
    ): Word
    deleteWord(id: ID!): Boolean
    editWord(
      id: ID! 
      userId: String
      word: String
      language: String
      meaning: String
      exampleSentence: String
      createdAt: String
    ): Word
  }
`;

export default wordSchema;
