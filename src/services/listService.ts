"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import prisma from "@/db";

export const createNewList = async (name: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw "Not logged in";
  }

  if (!name) {
    throw "Missing name";
  }

  const list = await prisma.lists.create({
    data: {
      name,
      userId: Number(session.user.id),
    },
    select: {
      id: true,
      userId: true,
    },
  });

  revalidatePath("/users/" + session.user.id);

  return list;
};

export const deleteList = async (id: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw "Not logged in";
  }

  await prisma.lists.delete({
    where: {
      id: id,
      userId: Number(session.user.id),
    },
  });
  revalidatePath("/users/" + session.user.id);
};

export const getUserLists = async (userId: number) => {
  const lists = await prisma.lists.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          listMovies: true,
        },
      },
      listMovies: {
        take: 1,
        select: {
          movie: {
            select: {
              poster_path: true,
            },
          },
        },
      },
    },
    orderBy: [
      {
        name: "asc",
      },
      { created_at: "desc" },
    ],
  });
  return lists;
};

export const getUsersOwnLists = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw "Not logged in";
  }

  const lists = await prisma.lists.findMany({
    where: {
      userId: Number(session.user.id),
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          listMovies: {
            where: {
              movieId: movieId,
            },
          },
        },
      },
    },
    orderBy: [
      {
        name: "asc",
      },
      { created_at: "desc" },
    ],
  });

  return lists.map(list => {
    return {
      id: list.id,
      name: list.name,
      isMovieInList: list._count.listMovies > 0,
    };
  });
};

export const getList = async (id: number) => {
  return await prisma.lists.findUnique({
    where: {
      id: id,
    },
    select: {
      userId: true,
      name: true,
      id: true,
      user: {
        select: {
          username: true,
        },
      },
      listMovies: {
        select: {
          movie: {
            select: {
              id: true,
              title: true,
              poster_path: true,
              release_date: true,
              runtime: true,
              overview: true,
              vote_average: true,
              release_dates: {
                where: {
                  iso_3166_1: {
                    equals: "US",
                  },
                },
                select: {
                  certification: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const toggleMovieList = async (movieId: number, listId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw "Not logged in";
  }

  const isInList = !!(await prisma.listMovies.findUnique({
    where: {
      listId_movieId: { listId, movieId },
    },
  }));

  revalidatePath("/users/" + session.user.id);
  revalidatePath("/lists/" + listId);

  if (!isInList) {
    await prisma.listMovies.create({
      data: {
        movieId: movieId,
        listId: listId,
      },
    });
    return true;
  } else {
    await prisma.listMovies.delete({
      where: {
        listId_movieId: { listId, movieId },
      },
    });
    return false;
  }
};

export const updateListName = async (listId: number, newName: string) => {
  const updatedList = await prisma.lists.update({
    where: {
      id: listId,
    },
    data: {
      name: newName,
      updated_at: new Date(),
    },
  });

  return updatedList;
};
