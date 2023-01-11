import { User } from "../../models/user";
import bcrypt from "bcrypt";

export const signUp = async (
  login: string,
  name: string,
  password: string
): Promise<boolean> => {
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ where: { login } });
  if (user) {
    return false;
  }
  await User.create({ login, name, password: hashPassword });
  return true;
};
