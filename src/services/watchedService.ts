"use server";

import prisma from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";

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
    return;
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

export const getAllMovieRatings = async (movieId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const movieRatings = await prisma.watchedRatings.findMany({where: {
    movieId
  }})

  if (!movieRatings) {
    return null;
  }

  return movieRatings;
};

export const setMovieRating = async (movieId: number, rating: number | null) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
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
