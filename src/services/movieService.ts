"use server";

import prisma from "@/db";

export type MovieResponse = NonNullable<Awaited<ReturnType<typeof getMovieById>>>;
const getMovieById = async (movieId: number, iso_3166_1 = "FI") => {
  const movieResult = await prisma.movies.findUnique({
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
        take: 8,
        select: {
          person: {
            select: {
              name: true,
              profile_path: true,
            },
          },
          personId: true,
          character: true,
        },
        orderBy: {
          order: "asc",
        },
      },
      crew: {
        select: {
          person: {
            select: {
              name: true,
              profile_path: true,
            },
          },
          personId: true,
          job: true,
          department: true,
        },
        orderBy: {
          person: {
            popularity: "desc",
          },
        },
      },
      release_dates: {
        where: {
          iso_3166_1: {
            equals: iso_3166_1,
          },
        },
        select: {
          certification: true,
        },
      },
      importedReviews: true,
    },
  });
  if (!movieResult) {
    return null;
  }

  const { release_dates, ...movie } = movieResult;

  const rating = release_dates[0]?.certification;

  const directors = movie.crew
    .filter(person => person.job === "Director")
    .map(director => {
      return { personId: director.personId, name: director.person.name };
    });

  const crew = movie.crew.slice(0, 8).map(crewMember => {
    const {
      person: { name, profile_path },
      ...rest
    } = crewMember;
    return { ...rest, name, profile_path };
  });

  const cast = movie.cast.map(actor => {
    const {
      person: { name, profile_path },
      ...rest
    } = actor;
    return { ...rest, name, profile_path };
  });

  const genres = movie?.genres.map(genre => genre.genre.name);

  return { ...movie, genres, crew, directors, cast, rating };
};

const getMovieByLimitTypeGenre = async (limit: number, type: string, genre: string | undefined) => {
  const movieIdsForCertainGenre = await prisma.movieGenres.findMany({
    where: {
      genre: {
        name: {
          equals: genre,
          mode: "insensitive",
        },
      },
    },
  });
  const orderBy = {} as Record<string, string>;
  if (type === "new") {
    orderBy.release_date = "desc";
  } else if (type === "popular") {
    orderBy.popularity = "desc";
  } else if (type === "bestrated") {
    orderBy.vote_average = "desc";
  } else {
    return [];
  }

  const moviesPopularOrder = await prisma.movies.findMany({
    where: {
      id: { in: movieIdsForCertainGenre.map(movie => movie.movieId) },
    },
    take: limit,
    orderBy: orderBy,
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
};

const getAllGenres = async () => {
  const genres = await prisma.genres.findMany({
    select: { id: true, name: true },
  });
  return genres;
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

const getMovieCrewById = async (movieId: number) => {
  const movieCrew = await prisma.movieCrew.findMany({
    where: {
      movieId: movieId,
    },
    select: {
      person: {
        select: {
          id: true,
          name: true,
          profile_path: true,
        },
      },
      job: true,
    },
  });

  const movie = await prisma.movies.findUnique({
    where: {
      id: movieId,
    },
    select: {
      title: true,
    },
  });

  return {
    title: movie?.title,
    crew: movieCrew.map(crewMember => ({
      id: crewMember.person.id,
      name: crewMember.person.name,
      profilePath: crewMember.person.profile_path,
      job: crewMember.job,
    })),
  };
};

const getMovieCastById = async (movieId: number) => {
  const movieCast = await prisma.movieCast.findMany({
    where: {
      movieId: movieId,
    },
    select: {
      person: {
        select: {
          id: true,
          name: true,
          profile_path: true,
        },
      },
      character: true,
    },
  });

  const movie = await prisma.movies.findUnique({
    where: {
      id: movieId,
    },
    select: {
      title: true,
    },
  });

  return {
    title: movie?.title,
    cast: movieCast.map(castMember => ({
      id: castMember.person.id,
      name: castMember.person.name,
      profilePath: castMember.person.profile_path,
      character: castMember.character,
    })),
  };
};

const getMoviesByTitle = async (titlePart: string) => {
  const movies = await prisma.movies.findMany({
    where: {
      title: {
        contains: titlePart,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
      poster_path: true,
      release_date: true,
    },
    take: 4,
    orderBy: {
      vote_average: "desc",
    },
  });

  return movies;
};

export {
  getMovieById,
  getMovieReviewsById,
  getMovieByLimitTypeGenre,
  getAllGenres,
  getMovieCrewById,
  getMovieCastById,
  getMoviesByTitle,
};
