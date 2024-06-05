"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import prisma from "@/db";
import { validateFormData } from "@/utils/validateFormData";
import { reviewValidationSchema } from "@/schemas/reviewSchema";

const createReview = async (movieId: number, content: string, rating?: number | null) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw "Invalid session";
  }

  validateFormData(reviewValidationSchema, { review: content });

  const newReview = await prisma.reviews.create({
    data: {
      userId: Number(session.user.id),
      movieId,
      content,
      rating,
    },
  });

  return newReview;
};

const deleteReviewById = async (reviewId: number | string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw "Invalid session";
  }
  if (typeof reviewId === "number") {
    const deletedReview = await prisma.reviews.delete({
      where: {
        id: reviewId,
      },
    });
    revalidatePath(`/movie/${deletedReview.movieId}`);
    return deletedReview;
  } else {
    const deletedReview = await prisma.importedReviews.delete({
      where: {
        id: reviewId,
      },
    });
    revalidatePath(`/movie/${deletedReview.movieId}`);
    return deletedReview;
  }
};

const getAllReviewsForMovie = async (movieId: number) => {
  const session = await getServerSession(authOptions);
  const reviews = await prisma.movies.findUniqueOrThrow({
    where: {
      id: movieId,
    },
    include: {
      reviews: {
        select: {
          content: true,
          id: true,
          movieId: true,
          rating: true,
          user: {
            select: {
              username: true,
              id: true,
            },
          },
          reports: {
            where: {
              creatorId: session ? Number(session.user.id) : -1,
            },
          },
        },
      },
      importedReviews: {
        select: {
          id: true,
          movieId: true,
          content: true,
          created_at: true,
          updated_at: true,
          author: true,
          reports: {
            where: {
              creatorId: session ? Number(session.user.id) : -1,
            },
          },
        },
      },
    },
  });
  return reviews;
};

const getReviewById = async (reviewId: string) => {
  const importedReview = await prisma.importedReviews.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      reports: true,
      movie: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (importedReview) {
    return importedReview;
  }

  const reviewIdAsNumber = Number(reviewId);

  if (isNaN(reviewIdAsNumber)) {
    return null;
  }

  const review = await prisma.reviews.findUnique({
    where: {
      id: reviewIdAsNumber,
    },
    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
      reports: true,
      movie: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  if (review) {
    return review;
  }
  return null;
};

const findReviewsByUserId = async (userId: number) => {
  const userReviews = await prisma.reviews.findMany({
    where: {
      userId: userId,
    },
    include: {
      movie: true,
      reports: true,
    },
    orderBy: { created_at: "desc" },
  });

  return userReviews;
};

export { findReviewsByUserId, getReviewById, createReview, deleteReviewById, getAllReviewsForMovie };
