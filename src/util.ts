import jwt from "jsonwebtoken";

export const createToken = (
  user: any,
  secret = process.env.JWT_SECRET as string,
  expiresIn = "1h"
) => {
  const token = jwt.sign(user, secret, { expiresIn });
  return token;
};
