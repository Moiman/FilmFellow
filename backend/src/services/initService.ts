import { PrismaClient } from "@prisma/client";
import { MovieDataType } from "../scripts/initMovies.js";
import { PersonData } from "../scripts/initPersons.js";
import { Countries, Genre, Languages } from "../scripts/initOtherData.js";

const initMoviesDB = async (movie: MovieDataType) => {
  const prisma = new PrismaClient();

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
        data: reviewData,
      });
    }
  }
  await prisma.companies.createMany({
    data: movie.companies, skipDuplicates:true
  })

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

const initPersonDB = async (person: PersonData) => {
  const prisma = new PrismaClient();

  const existingPerson = await prisma.persons.findUnique({
    where: { id: person.id },
  });
  if (!existingPerson) {
    await prisma.persons.create({
      data: person,
    });
  }
};

const initGenresDB = async (genres: Genre[]) => {
  const prisma = new PrismaClient();
  await prisma.genres.createMany({
    data: genres,
    skipDuplicates: true,
  });
};

const initCountriesDB = async (countries: Countries[]) => {
  const prisma = new PrismaClient();
  await prisma.countries.createMany({
    data: countries,
    skipDuplicates: true,
  });
};

const initLanguagesDB = async (languages: Languages[]) => {
  const prisma = new PrismaClient();
  await prisma.languages.createMany({
    data: languages,
    skipDuplicates: true,
  });
};

export { initMoviesDB, initPersonDB, initGenresDB, initCountriesDB, initLanguagesDB };
