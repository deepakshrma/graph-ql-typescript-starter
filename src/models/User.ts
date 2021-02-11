import { all, run } from "./database";

interface User {
  firstname: string;
  lastname: string;
  age: number;
  address?: string;
}
const TABLE_NAME = "users";

const createUser = async (user: User) => {
  return await run(
    `INSERT INTO ${TABLE_NAME} (firstname,lastname,age) VALUES(?,?,?)`,
    [user.firstname, user.lastname, user.age]
  );
};
const getUsers = async () => {
  return await all(
    `SELECT rowid as id,firstname,lastname,age FROM ${TABLE_NAME}`
  );
};
export default { createUser , getUsers };
