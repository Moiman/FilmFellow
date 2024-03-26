import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMovieById = async (movieId: number) => {
  const movie = await prisma.movies.findUnique({
    where: {
      id: movieId,
    },
    include: {
      genres: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
      cast: {
        take: 6,
      },
      crew: {
        take: 6,
      },
      importedReviews: true,
    },
  });
  if (!movie) {
    return null;
  }
  return { ...movie, genres: movie?.genres.map(genre => genre.genre.name) };
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
      const moviesDescendingOrder = await prisma.movies.findMany({
        where: {
          id: { in: movieIdsForCertainGenre.map(movie => movie.movieId) },
        },
        take: limit,
        orderBy: {
          release_date: "desc",
        },
        include: {
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      const moviesWithRearrangedGenres = moviesDescendingOrder.map(element => {
        return { ...element, genres: element.genres.map(genre => genre.genre.name) };
      });
      return moviesWithRearrangedGenres;
    }
    if (givenType === "popular") {
      const moviesPopularOrder = await prisma.movies.findMany({
        where: {
          id: { in: movieIdsForCertainGenre.map(movie => movie.movieId) },
        },
        take: limit,
        orderBy: {
          popularity: "desc",
        },
        include: {
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      const moviesWithRearrangedGenres = moviesPopularOrder.map(element => {
        return { ...element, genres: element.genres.map(genre => genre.genre.name) };
      });
      return moviesWithRearrangedGenres;
    }
    if (givenType === "bestrated") {
      const moviesBestRatedOrder = await prisma.movies.findMany({
        where: {
          id: { in: movieIdsForCertainGenre.map(movie => movie.movieId) },
        },
        take: limit,
        orderBy: {
          vote_average: "desc",
        },
        include: {
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      const moviesWithRearrangedGenres = moviesBestRatedOrder.map(element => {
        return { ...element, genres: element.genres.map(genre => genre.genre.name) };
      });
      return moviesWithRearrangedGenres;
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
      movie: true,
    },
  });

  return movieReviews;
};

export { getMovieById, getMovieReviewsById, getMovieByLimitTypeGenre };
