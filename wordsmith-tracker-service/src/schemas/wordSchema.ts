import { gql } from 'apollo-server-express';

const wordSchema = gql`
  type Word {
    id: ID!
    userId: ID!
    word: String!
    language: String!
    meaning: String!
    exampleSentence: String!
    createdAt: String!
  }

  type Query {
    getWords(userId: ID!): [Word]
    getAllWords: [Word!]!
  }

  type Mutation {
    addWord(
      userId: ID!,
      word: String!,
      language: String!,
      meaning: String!,
      exampleSentence: String!
      createdAt: String!
    ): Word
    deleteWord(id: ID!): Boolean
    editWord(
      id: ID!,
      word: String,
      language: String,
      meaning: String,
      exampleSentence: String
      createdAt: String!
    ): Word
  }
`;

export default wordSchema;
