"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import prisma from "@/db";

export const getIsWatched = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }

  return !!(await prisma.watchedRatings.findUnique({
    where: {
      userId_movieId: {
        userId: Number(session.user.id),
        movieId: movieId,
      },
    },
  }));
};

export const toggleIsWatched = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const isWatched = await getIsWatched(movieId);

  if (!isWatched) {
    await prisma.watchedRatings.create({
      data: {
        userId: Number(session.user.id),
        movieId: movieId,
      },
    });
  } else {
    await prisma.watchedRatings.delete({
      where: {
        userId_movieId: {
          userId: Number(session.user.id),
          movieId: movieId,
        },
      },
    });
  }

  revalidatePath("/movies/" + movieId);
};

export const getMovieRating = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const movie = await prisma.watchedRatings.findUnique({
    where: {
      userId_movieId: {
        userId: Number(session.user.id),
        movieId,
      },
    },
  });

  if (!movie) {
    return null;
  }

  return movie.rating;
};

export const setMovieRating = async (movieId: number, rating: number | null) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = Number(session.user.id);

  await prisma.watchedRatings.upsert({
    where: {
      userId_movieId: {
        userId,
        movieId,
      },
    },
    create: {
      userId,
      movieId,
      rating,
    },
    update: {
      rating,
    },
  });
};

export const getUserOwnFavoritesAndRatings = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const favorites = await prisma.favorites.findMany({
    where: {
      userId: Number(session.user.id),
    },
    select: {
      movieId: true,
    },
  });

  const ratings = await prisma.watchedRatings.findMany({
    where: {
      userId: Number(session.user.id),
      rating: {},
    },
    select: {
      movieId: true,
      rating: true,
    },
  });

  return {
    ratings: ratings,
    favorites: favorites.map(favorite => favorite.movieId),
  };
};
