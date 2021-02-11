import User from "./User";
export interface Models {
  models: {
    User: typeof User;
  };
}
export default { User };