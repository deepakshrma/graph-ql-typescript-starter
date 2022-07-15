// src/resolvers/users.ts

import bcrypt from "bcrypt";
import { AppContext } from "../interfaces/AppContext";
import { User } from "../interfaces/User";
import { createToken } from "../util";
const validatePassword = async function (password: string, userpw: string) {
  return await bcrypt.compare(password, userpw);
};

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
    register: async (
      _: any,
      { name, username, password }: User,
      { models }: AppContext
    ) => {
      const passwd = await bcrypt.hash(password, 10);
      const user = { name, username, password: passwd };
      await models.User.createUser(user);
      return user;
    },
    login: async (
      _: any,
      { username, password }: User,
      { models, secret }: AppContext
    ) => {
      const user = (await models.User.getUserByUserName(username)) as User;
      if (!user) throw Error("User not found!");
      const isValid = await validatePassword(password, user.password);
      if (!isValid) throw Error("Invalid User!");
      console.log({
        token: createToken(user, secret, "10m"),
      });
      return {
        token: createToken(user, secret, "10m"),
      };
    },
  },
};
export default resolvers;
