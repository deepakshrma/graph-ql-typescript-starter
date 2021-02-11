import { promisify } from "util";
import { RunResult, verbose } from "sqlite3";
const sqlite3 = verbose();
const db = new sqlite3.Database(":memory:");
const all = promisify(db.all).bind(db);

const run = async (query: string, args: any[]): Promise<{id?: number}> => {
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
      firstname TEXT NOT NULL,
      lastname TEXT,
      age INTEGER NOT NULL,
      address TEXT
    )`);
  });
};

export { all, run };
export default db;
