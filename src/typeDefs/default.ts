const { gql } = require("apollo-server-express");

export default gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;
