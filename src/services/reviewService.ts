"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { Role } from "@prisma/client";
import prisma from "@/db";
import { getAllMovieRatings, getMovieRating, setMovieRating } from "./watchedService";

const createReview = async (movieId: number, content: string, rating?: number | null) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw "Invalid session";
  }
  const newReview = await prisma.reviews.create({
    data: {
      userId: Number(session.user.id),
      movieId,
      content,
    },
  });
  if (rating) {
    await setMovieRating(movieId, rating);
    console.log(rating);
  }

  return newReview;
};

const deleteReviewById = async (reviewId: number) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.admin) {
    throw "Invalid session";
  }
  const deletedReport = await prisma.reviews.delete({
    where: {
      id: reviewId,
    },
  });

  return deletedReport;
};

const getImportedReviewsAndLocalReviewsById = async (movieId: number) => {
/*
  const watchedRatings = await getAllMovieRatings(movieId);
  const importedReviews = await prisma.importedReviews.findMany({
    where: {
      id: String(movieId),
    },
    // select: {
    //   importedReviews: true,
    // },
  });
  const reviews = await prisma.reviews.findMany({
    where: {
      id: movieId
    },
    // select: {
      // reviews: true,
      // importedReviews: true
    // }
  })
  const newReviews = reviews.map(element => {
    return { ...element, watchedRatings: watchedRatings, importedReviews: importedReviews };
  });
  return newReviews;
  */
 const review = await prisma.movies.findUnique({
  where: {
    id: movieId
  },
  select: {
    reviews: true,
    importedReviews: true,
    watchedRatings: true
  }
 })
 return review;
};

export { createReview, deleteReviewById, getImportedReviewsAndLocalReviewsById };
