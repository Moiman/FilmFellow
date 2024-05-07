"use server";

import prisma from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";

export const getIsFavorite = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }

  return !!(await prisma.favorites.findUnique({
    where: {
      userId_movieId: {
        userId: Number(session.user.id),
        movieId: movieId,
      },
    },
  }));
};

export const toggleIsFavorite = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const isFavorite = await getIsFavorite(movieId);

  if (!isFavorite) {
    await prisma.favorites.create({
      data: {
        userId: Number(session.user.id),
        movieId: movieId,
      },
    });
  } else {
    await prisma.favorites.delete({
      where: {
        userId_movieId: {
          userId: Number(session.user.id),
          movieId: movieId,
        },
      },
    });
  }
};

export const findUserFavoritesById = async (userId: number) => {
  const movies = await prisma.movies.findMany({
    where: {
      favorites: { some: { userId: userId } },
    },
    select: {
      id: true,
      title: true,
      poster_path: true,
    },
  });

  return movies;
};
