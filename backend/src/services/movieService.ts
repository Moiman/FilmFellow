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

const getMovieByLimitTypeGenre = async (limit: number, type: string, genre: string) => {
  const genres = await prisma.genres.findMany();
  const givenGenre = genre[0].toUpperCase() + genre.substring(1);
  const givenType = type.toLowerCase();
  const queryGenre = genres.find(Genre => Genre.name === givenGenre);
  if (queryGenre) {
    const movieIdsForCertainGenre = await prisma.movieGenres.findMany({
      where: {
        genreId: queryGenre.id,
      },
    });
    if (givenType === "new") {
      const moviesWithCertainGenre = await prisma.movies.findMany({
        where: {
          id: { in: movieIdsForCertainGenre.map(movie => movie.movieId) },
        },
        take: limit,
        orderBy: {
          release_date: "desc",
        },
      });
      return moviesWithCertainGenre;
    } else {
      const moviesWithCertainGenre = await prisma.movies.findMany({
        where: {
          id: { in: movieIdsForCertainGenre.map(movie => movie.movieId) },
        },
        take: limit,
        orderBy: {
          release_date: "asc",
        },
      });
      return moviesWithCertainGenre;
    }
  }
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
