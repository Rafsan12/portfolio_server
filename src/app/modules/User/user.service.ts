import bcrypt from "bcryptjs";
import { prisma } from "../../../config/db";
import { IUser } from "./user.interface";

const createUser = async (payload: IUser) => {
  //   console.log({ payload });
  const { name, email, password } = payload;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password as string, salt);
  const createUser = await prisma.user.create({
    data: { name, email, password: hashPassword },
  });
  return createUser;
};

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error(" Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) {
    throw new Error(" Invalid  password");
  }
  return user;
};

export const UserService = { createUser, loginUser };
