import jwt from "jsonwebtoken";

const secret = "chEIroD3pneUqUeiM4d0";

interface User {
  user: number;
}

export const sign = (payload: User) =>
  jwt.sign(payload, secret, { expiresIn: 86400 });

export const verify = (token: string) => <User>jwt.verify(token, secret);
