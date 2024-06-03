"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import prisma from "@/db";
import { Role } from "@prisma/client";
import { validateFormData } from "@/utils/validateFormData";
import { listValidationSchema } from "@/schemas/listSchema";

export const createNewList = async (name: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!name && name.trim().length === 0) {
    throw new Error("Missing name");
  }

  validateFormData(listValidationSchema, { listName: name });

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
    throw new Error("Unauthorized");
  }

  await prisma.lists.delete({
    where: {
      id: id,
      userId: Number(session.user.id),
    },
  });
  revalidatePath("/users/" + session.user.id);
};

export const deleteListByAdmin = async (id: number) => {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== Role.admin) {
    throw new Error("Unauthorized");
  }

  const deletedList = await prisma.lists.delete({
    where: {
      id: id,
    },
  });
  return deletedList;
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

  const watchlistPoster = await prisma.watchListMovies.findFirst({
    where: {
      userId,
      movie: { NOT: { poster_path: null } },
    },
    select: {
      movie: {
        select: {
          poster_path: true,
        },
      },
    },
  });

  const watchlistList = {
    id: ("watchlist_" + userId) as number | string,
    name: "Watchlist",
    listMovies: [
      {
        movie: {
          poster_path: watchlistPoster?.movie.poster_path ?? null,
        },
      },
    ],
    _count: {
      listMovies: await prisma.watchListMovies.count({ where: { userId } }),
    },
  };

  const watchedPoster = await prisma.watchedRatings.findFirst({
    where: {
      userId,
      movie: { NOT: { poster_path: null } },
    },
    select: {
      movie: {
        select: {
          poster_path: true,
        },
      },
    },
  });

  const watchedList = {
    id: ("watched_" + userId) as number | string,
    name: "Watched",
    listMovies: [
      {
        movie: {
          poster_path: watchedPoster?.movie.poster_path ?? null,
        },
      },
    ],
    _count: {
      listMovies: await prisma.watchedRatings.count({ where: { userId } }),
    },
  };

  return [watchedList, watchlistList].concat(lists);
};

export const getUsersOwnLists = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
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

export const getList = async (listId: string) => {
  if (listId.slice(0, 9) === "watchlist") {
    const userId = Number(listId.slice(10));
    const user = await prisma.users.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        username: true,
      },
    });

    const watchListMovies = await prisma.watchListMovies.findMany({
      where: {
        userId: userId,
      },
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
    });

    const watchlistList = {
      userId,
      id: "watchlist_" + userId,
      name: "Watchlist",
      user: {
        username: user.username,
      },
      listMovies: watchListMovies,
    };

    return watchlistList;
  } else if (listId.slice(0, 7) === "watched") {
    const userId = Number(listId.slice(8));
    const user = await prisma.users.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        username: true,
      },
    });

    const watchedRatings = await prisma.watchedRatings.findMany({
      where: {
        userId: userId,
      },
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
    });

    const watchedList = {
      userId,
      id: "watched_" + userId,
      name: "Watched",
      user: {
        username: user.username,
      },
      listMovies: watchedRatings,
    };

    return watchedList;
  } else {
    const id = Number(listId);
    if (isNaN(id)) {
      return null;
    }
    const list = await prisma.lists.findUnique({
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
    return list;
  }
};

export const toggleMovieList = async (movieId: number, listId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
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
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!newName && newName.trim().length === 0) {
    throw new Error("Missing name");
  }

  validateFormData(listValidationSchema, { listName: newName });

  const updatedList = await prisma.lists.update({
    where: {
      id: listId,
      userId: Number(session.user.id),
    },
    data: {
      name: newName,
      updated_at: new Date(),
    },
  });

  revalidatePath("/users/" + session.user.id);
  revalidatePath(`/lists/${listId}`);
  return updatedList;
};
