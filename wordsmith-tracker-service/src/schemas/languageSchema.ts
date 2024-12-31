import { gql } from 'apollo-server-express';

const languageSchema = gql`
  type Language {
    id: ID!
    name: String!
  }
  
  type Mutation {
    seedLanguages: String!
  }
  
  type Query {
    getLanguages: [Language!]!
  }`

export default languageSchema;      
