import UserModel from "../models/User";

export interface AppContext {
  models: {
    User: typeof UserModel;
  };
  me: any;
  secret: string;
}
