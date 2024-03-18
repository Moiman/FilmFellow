import { PrismaClient } from "@prisma/client";
import { MovieDataType } from "../scripts/initMovies.js";

const prisma = new PrismaClient();

const initMoviesDB = async (movie: MovieDataType) => {
  const existingMovie = await prisma.movies.findUnique({
    where: { id: movie.movie.id },
  });
  if (!existingMovie) {
    await prisma.movies.create({
      data: movie.movie,
    });
  }
  const existingReviews = await prisma.importedReviews.findMany({
    where: { movieId: movie.movie.id },
  });
  if (!existingReviews) {
    for (const reviewData of movie.reviews) {
      await prisma.importedReviews.create({
        data: {
          movieId: reviewData.movieid,
          author: reviewData.author,
          content: reviewData.content,
          created_at: reviewData.created_at,
          updated_at: reviewData.updated_at,
          id: reviewData.id,
        },
      });
    }
  }

  /*
  for (const castData of movie.cast) {
    await prisma.movieCast.create({
      data: {
        movieId: castData.movieid,
        personId: castData.personId,
        character: castData.character,
        credit_id: castData.credit_id,
        order: castData.order
      }
    });
  }
  for (const crewData of movie.crew) {
    await prisma.movieCrew.create({
      data: {
        movieId: crewData.movieid,
        personId: crewData.personId,
        credit_id: crewData.credit_id,
        department: crewData.department,
        job: crewData.job,
      },
    });
  }
  */
};

export { initMoviesDB };
