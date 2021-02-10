// src/resolvers/users.ts

const resolvers = {
  Query: {
    users: () => [
      {
        firstname: "deepak",
        lastname: "vishwakarma",
      },
      {
        firstname: "deepak",
        lastname: "sharma",
      },
    ],
  },
};
export default resolvers;
