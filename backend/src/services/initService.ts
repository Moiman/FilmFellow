import { PrismaClient } from "@prisma/client";
import { MovieDataType } from "../scripts/initMovies.js";
import { PersonData } from "../scripts/initPersons.js";
import { Countries, Genre, Languages } from "../scripts/initOtherData.js";

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

  await prisma.importedReviews.createMany({
    data: movie.reviews,
    skipDuplicates: true,
  });

  await prisma.companies.createMany({
    data: movie.companies,
    skipDuplicates: true,
  });

  await prisma.spokenLanguages.createMany({
    data: movie.spokenLanguages,
    skipDuplicates: true,
  });

  await prisma.productionCompanies.createMany({
    data: movie.productionCompanies,
    skipDuplicates: true,
  });
  await prisma.productionCountries.createMany({
    data: movie.productionCountries,
    skipDuplicates: true,
  });
  await prisma.releaseDates.createMany({
    data: movie.releaseDates,
    skipDuplicates: true,
  });
  if (movie.translation) {
    await prisma.translations.createMany({
      data: movie.translation,
      skipDuplicates: true,
    });
  }
  await prisma.movieGenres.createMany({
    data: movie.movieGenres,
    skipDuplicates: true,
  });

  await prisma.movieCast.createMany({
    data: movie.cast,
    skipDuplicates: true,
  });

  await prisma.movieCrew.createMany({
    data: movie.crew,
    skipDuplicates: true,
  });
};

const initPersonDB = async (person: PersonData) => {
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
  await prisma.genres.createMany({
    data: genres,
    skipDuplicates: true,
  });
};

const initCountriesDB = async (countries: Countries[]) => {
  await prisma.countries.createMany({
    data: countries,
    skipDuplicates: true,
  });
};

const initLanguagesDB = async (languages: Languages[]) => {
  await prisma.languages.createMany({
    data: languages,
    skipDuplicates: true,
  });
};

export { initMoviesDB, initPersonDB, initGenresDB, initCountriesDB, initLanguagesDB };
