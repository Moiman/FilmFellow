"use server";

import prisma from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";

export const getIsInWatchlist = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }

  return !!(await prisma.watchListMovies.findUnique({
    where: {
      userId_movieId: {
        userId: Number(session.user.id),
        movieId: movieId,
      },
    },
  }));
};

export const toggleWatchlist = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw Error("No session");
  }

  const isInWatchlist = await getIsInWatchlist(movieId);

  if (!isInWatchlist) {
    await prisma.watchListMovies.create({
      data: {
        userId: Number(session.user.id),
        movieId: movieId,
      },
    });
    return true;
  } else {
    await prisma.watchListMovies.delete({
      where: {
        userId_movieId: {
          userId: Number(session.user.id),
          movieId: movieId,
        },
      },
    });
    return false;
  }
};
