import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: String
    username: String
    name: String
    password: String
  }
  input UserInput {
    username: String
    name: String
    password: String
  }
  type Token {
    token: String
  }
  extend type Query {
    users: [User]
  }
  extend type Mutation {
    createUser(input: UserInput!): User
    register(name: String!, username: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`;
export default typeDefs;
