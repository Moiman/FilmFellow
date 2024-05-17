"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { Role } from "@prisma/client";
import prisma from "@/db";

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
      rating,
    },
  });

  return newReview;
};

const deleteReviewById = async (reviewId: number | string) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.admin) {
    throw "Invalid session";
  }
  if (typeof reviewId === "number") {
    const deletedReview = await prisma.reviews.delete({
      where: {
        id: reviewId,
      },
    });

    return deletedReview;
  } else {
    const deletedReview = await prisma.importedReviews.delete({
      where: {
        id: reviewId,
      },
    });

    return deletedReview;
  }
};

const getImportedReviewsAndLocalReviewsById = async (movieId: number) => {
  const review = await prisma.movies.findUnique({
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
        },
      },
      importedReviews: true,
    },
  });
  return review;
};

const getReviewById = async (reviewId: number | string) => {
  if (typeof reviewId === "number") {
    const review = await prisma.reviews.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });

    return review;
  } else {
    const importedReview = await prisma.importedReviews.findUnique({
      where: {
        id: reviewId,
      },
    });

    return importedReview;
  }
};

export { getReviewById, createReview, deleteReviewById, getImportedReviewsAndLocalReviewsById };
