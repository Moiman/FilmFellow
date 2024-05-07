import { authOptions } from "@/authOptions";
import prisma from "@/db";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth/next";

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
  created_at: true,
  updated_at: true,
  last_visited: true,
  isActive: true,
  banDuration: true,
};

const createUser = async (email: string, username: string, password: string) => {
  const newUser = await prisma.users.create({
    data: {
      username,
      email,
      password,
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

const updateUser = async (userId: number, user: User) => {
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
    return [];
  }
  const users = await prisma.users.findMany({
    select: selectUserFields,
  });

  return users;
};

const updateUserLastVisited = async (id: number, last_visited: Date) => {
  await prisma.users.update({
    where: { id: id },
    data: {
      last_visited: last_visited,
    },
    select: selectUserFields,
  });
};

const changeUserStatusById = async (id: number, status: boolean, banDuration?: number | null) => {
  if (banDuration) {
    const banEndDateInMS = new Date().getTime() + banDuration * 1000;
    const banEndDate = new Date(banEndDateInMS);
    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        banDuration: banEndDate,
        isActive: status,
      },
    });
  } else {
    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        banDuration: null,
        isActive: status,
      },
    });
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
  updateUserLastVisited,
  changeUserStatusById,
};
