import { User } from "../interfaces/User";
import { all, get, run } from "./database";

const TABLE_NAME = "users";

const createUser = async (user: User) => {
  return await run(
    `INSERT INTO ${TABLE_NAME} (name,username,password) VALUES(?,?,?)`,
    [user.name, user.username, user.password]
  );
};
const getUserByUserName = async (username: string) => {
  return await get(
    `SELECT rowid as id,name,username,password FROM ${TABLE_NAME} where username='${username}'`
  );
};
const getUsers = async () => {
  return await all(
    `SELECT rowid as id,name,username,password FROM ${TABLE_NAME}`
  );
};
export default { createUser, getUsers, getUserByUserName };
