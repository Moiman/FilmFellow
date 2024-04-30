import { authOptions } from "@/authOptions";
import { PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export interface User {
  username: string;
  email: string;
  password: string;
  role: Role;
}

const selectUserFields = {
  id: true,
  email: true,
  username: true,
  role: true,
};

const selectUserFieldsForAdmin = {
  id: true,
  email: true,
  username: true,
  role: true,
  created_at: true,
  updated_at: true,
  last_visited: true,
  isActive: true,
};

const createUser = async (email: string, username: string, password: string) => {
  const newUser = await prisma.users.create({
    data: {
      username,
      email,
      password,
      role: Role.user,
      last_visited: new Date(),
      isActive: true,
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

const findUserByUsername = async (username: string) => {
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
    select: selectUserFields,
  });

  return user;
};

const updateUser = async (userId: number, user: User, last_visited?: Date) => {
  if (last_visited) {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        last_visited: last_visited,
      },
      select: selectUserFields,
    });
    return updatedUser;
  } else {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        updated_at: new Date(),
      },
      select: selectUserFields,
    });

    return updatedUser;
  }
};

const deleteUserById = async (id: number) => {
  const user = await prisma.users.delete({
    where: {
      id: id,
    },
    select: selectUserFields,
  });

  return user;
};

const getAllUsers = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.admin) {
    return;
  }
  const users = await prisma.users.findMany({
    select: selectUserFieldsForAdmin,
  });

  return users;
};

const changeUserStatusById = async (id: number, status: boolean, banDuration?: number | null) => {
  const user = await findUserById(id);
  if (user) {
    if (banDuration) {
      const banEndDateInMS = new Date().getTime() + (banDuration * 1000);
      const banEndDate = new Date(banEndDateInMS);
      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          banDuration: banEndDate,
          isActive: status,
        },
      });
    } else {
      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          banDuration: null,
          isActive: status,
        },
      });
    }
  }
};

export {
  createUser,
  findUserByEmail,
  deleteUserById,
  findUserById,
  findUserByUsername,
  updateUser,
  getAllUsers,
  changeUserStatusById,
};
