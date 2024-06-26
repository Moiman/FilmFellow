"use server";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/authOptions";
import prisma from "@/db";

const selectUserFields = {
  id: true,
  username: true,
};

const addFriend = async (friendId: number) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const newFriend = await prisma.users.update({
    where: { id: Number(session.user.id) },
    data: {
      friends: {
        connect: { id: friendId },
      },
    },
    select: selectUserFields,
  });
  revalidatePath("/users/" + session.user.id);
  return newFriend;
};

const removeFriend = async (friendId: number) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const removedFriend = await prisma.users.update({
    where: { id: Number(session.user.id) },
    data: {
      friends: {
        disconnect: { id: friendId },
      },
    },
    select: selectUserFields,
  });
  revalidatePath("/users/" + session.user.id);
  return removedFriend;
};

const getIsUserAlreadyFriend = async (friendId: number) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const friend = !!(await prisma.users.findFirst({
    where: {
      id: Number(session.user.id),
      friends: {
        some: {
          id: friendId,
        },
      },
    },
  }));

  return friend;
};

export { addFriend, removeFriend, getIsUserAlreadyFriend };
