import { PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";

const prisma = new PrismaClient();

const selectUserFields = {
  id: true,
  email: true,
  username: true,
};

const createUser = async (email: string, username: string, password: string) => {
  const newUser = await prisma.users.create({
    data: {
      username,
      email,
      password,
      role: Role.user,
    },
    select: selectUserFields,
  });

  return newUser;
};
const findUserByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const findUserById = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  return user;
};

const deleteUserById = async (id: number) => {
  const user = await prisma.users.delete({
    where: {
      id: id,
    },
  });

  return user;
};

export { createUser, findUserByEmail, deleteUserById, findUserById };
