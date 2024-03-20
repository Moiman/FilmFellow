import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMovieById = async (movieId: number) => {
  const movie = await prisma.movies.findUnique({
    where: {
      id: movieId,
    },
  });
  return movie;
};

const getMovieByLimitTypeGenre = async (limit?: number, type?: string, genre?: string) => {
  console.log(limit);
  const genres = await prisma.genres.findMany();
  const queryGenre = genres.find(Genre => Genre.name === genre);

  const movieIdsForCertainGenre = await prisma.movieGenres.findMany({
    where: {
      genreId: queryGenre?.id,
    },
  });

  const moviesWithCertainGenre = await prisma.movies.findMany({
    where: {
      id: { in: movieIdsForCertainGenre.map(movie => movie.movieId) },
    },
    take: limit,
  });
  return moviesWithCertainGenre;
};

const getMovieReviewsById = async (movieId: number) => {
  const movieReviews = await prisma.importedReviews.findMany({
    where: {
      movieId: movieId,
    },

    select: {
      content: true,
      author: true,
    },
  });

  return movieReviews;
};

export { getMovieById, getMovieReviewsById, getMovieByLimitTypeGenre };
