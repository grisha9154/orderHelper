import jsonwebtoken from "jsonwebtoken";
import { BaseUserInfo } from "./interfaces";

export const getJWTToken = (user: BaseUserInfo) => {
  const JWTSecret = process.env.JWT_SECRET;
  if (!JWTSecret) {
    throw new Error("JWT_SECRET empty");
  }
  return jsonwebtoken.sign({ user: user.login, id: user.id }, JWTSecret);
};
