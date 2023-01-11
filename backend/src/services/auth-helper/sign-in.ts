import { User } from "../../models/user";
import { BaseUserInfo } from "./interfaces";
import bcrypt from 'bcrypt';

export const signIn = async (
  login: string,
  password: string
): Promise<BaseUserInfo | null> => {
  const user = await User.findOne({ where: { login } });
  if (user === null) {
    return null;
  }

  const isPasswordEqual = await bcrypt.compare(password, user.password);

  if (!isPasswordEqual) {
    return null;
  }

  return {
    id: user.id,
    login: user.login,
    name: user.name,
  };
};
