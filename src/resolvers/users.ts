// src/resolvers/users.ts

import { Models } from "../models/";

const resolvers = {
  Query: {
    users: async (_: any, __: any, { models }: Models) => {
      return await models.User.getUsers();
    },
  },
  Mutation: {
    createUser: async (_: any, { input: user }: any, { models }: Models) => {
      const { id } = await models.User.createUser(user);
      return { ...user, id };
    },
  },
};
export default resolvers;
