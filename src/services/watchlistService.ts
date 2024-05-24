"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import prisma from "@/db";

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

  const userId = Number(session.user.id);

  const isInWatchlist = await getIsInWatchlist(movieId);

  if (!isInWatchlist) {
    await prisma.watchListMovies.create({
      data: {
        userId: userId,
        movieId: movieId,
      },
    });
  } else {
    await prisma.watchListMovies.delete({
      where: {
        userId_movieId: {
          userId: Number(session.user.id),
          movieId: movieId,
        },
      },
    });
  }

  revalidatePath("/movies/" + movieId);

  return !isInWatchlist;
};
