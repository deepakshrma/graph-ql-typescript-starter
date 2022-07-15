import sqlite3, { RunResult } from "sqlite3";
import { promisify } from "util";

// const sqlite3 = verbose();
const db = new sqlite3.Database(":memory:");
const all = promisify(db.all).bind(db);
const get = promisify(db.get).bind(db);

const run = async (query: string, args: any[]): Promise<{ id?: number }> => {
  return new Promise((res, rej) => {
    db.run(query, args, function (this: RunResult, err: Error) {
      if (err) rej(err);
      else res({ id: this.lastID });
    });
  });
};

export const init = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE users (
      name TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )`);
  });
};

export { all, run, get };
export default db;
