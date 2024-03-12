import { PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";

const prisma = new PrismaClient();

const selectUserFields = {
  id: true,
  email: true,
  username: true,
};

const createUser = async (email: string, username: string, passwordhash: string, birthdate: Date) => {
  const newUser = await prisma.users.create({
    data: {
      username,
      email,
      passwordhash,
      birthdate,
      role: Role.user,
    },
    select: selectUserFields,
  });

  return newUser;
};

export { createUser };
