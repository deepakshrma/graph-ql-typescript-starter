// src/resolvers/users.ts

import { AppContext } from "../interfaces/AppContext";

const resolvers = {
  Query: {
    users: async (_: any, __: any, { models }: AppContext) => {
      return await models.User.getUsers();
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { input: user }: any,
      { models, me }: AppContext
    ) => {
      console.info("User info", me);
      const { id } = await models.User.createUser(user);
      return { ...user, id };
    },
  },
};
export default resolvers;
