import { gql } from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    dailyGoal: Int
    createdAt: String!
  }

  type Query {
    getUser(email: String!): User
    getAllUsers: [User!]!    
  }

  type Mutation {
    createUser(username: String!, email: String!, dailyGoal: Int!, createdAt: String!): User
  }
`;

export default userSchema;
