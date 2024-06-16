import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import prisma from "@/db";
import { Role } from "@prisma/client";

export const statistics = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.admin) {
    throw new Error("Unauthorized");
  }

  const promises = [
    prisma.users.count(),
    prisma.movies.count(),
    prisma.persons.count(),
    prisma.reviews.count(),
    prisma.importedReviews.count(),
    prisma.reports.count(),
    prisma.favorites.count(),
    prisma.watchedRatings.count(),
    prisma.watchedRatings.count({ where: { rating: { not: null } } }),
    prisma.lists.count(),
  ];

  const [users, movies, persons, reviews, importedReviews, reports, favorites, watchedRatings, ratings, lists] =
    await Promise.all(promises);

  return { users, movies, persons, reviews, importedReviews, reports, favorites, watchedRatings, ratings, lists };
};

export const topFavorites = async () => {
  const movies = await prisma.movies.findMany({
    orderBy: { favorites: { _count: "desc" } },
    take: 6,
    select: {
      id: true,
      title: true,
      poster_path: true,
    },
  });
  return movies;
};
