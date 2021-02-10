import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    firstname: String
    lastname: String
    age: Int
    address: String
  }
  extend type Query {
    users: [User]
  }
`;
export default typeDefs;
