import { PrismaClient } from "@prisma/client";
import type { MovieDataType } from "../scripts/initMovies.js";
import type { PersonData } from "../scripts/initPersons.js";
import type { Country, Genre, Language } from "../scripts/types.js";

const prisma = new PrismaClient();

const initMovieDB = async (movie: MovieDataType) => {
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

const initMoviesDB = async (movies: MovieDataType["movie"][]) => {
  await prisma.movies.createMany({
    data: movies,
    skipDuplicates: true,
  });
};

const initReviewsDB = async (reviews: MovieDataType["reviews"]) => {
  await prisma.importedReviews.createMany({
    data: reviews,
    skipDuplicates: true,
  });
};

const initCompaniesDB = async (companies: MovieDataType["companies"]) => {
  await prisma.companies.createMany({
    data: companies,
    skipDuplicates: true,
  });
};

const initSpokenLanguagesDB = async (spokenLanguages: MovieDataType["spokenLanguages"]) => {
  await prisma.spokenLanguages.createMany({
    data: spokenLanguages,
    skipDuplicates: true,
  });
};

const initProductionCompaniesDB = async (productionCompanies: MovieDataType["productionCompanies"]) => {
  await prisma.productionCompanies.createMany({
    data: productionCompanies,
    skipDuplicates: true,
  });
};

const initProductionCountriesDB = async (productionCountries: MovieDataType["productionCountries"]) => {
  await prisma.productionCountries.createMany({
    data: productionCountries,
    skipDuplicates: true,
  });
};

const initReleaseDatesDB = async (releaseDates: MovieDataType["releaseDates"]) => {
  await prisma.releaseDates.createMany({
    data: releaseDates,
    skipDuplicates: true,
  });
};

const initTranslationsDB = async (translations: NonNullable<MovieDataType["translation"]>[]) => {
  await prisma.translations.createMany({
    data: translations,
    skipDuplicates: true,
  });
};

const initmovieGenresDB = async (movieGenres: MovieDataType["movieGenres"]) => {
  await prisma.movieGenres.createMany({
    data: movieGenres,
    skipDuplicates: true,
  });
};

const initCastDB = async (cast: MovieDataType["cast"]) => {
  await prisma.movieCast.createMany({
    data: cast,
    skipDuplicates: true,
  });
};

const initCrewDB = async (crew: MovieDataType["crew"]) => {
  await prisma.movieCrew.createMany({
    data: crew,
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

const initPersonsDB = async (persons: PersonData[]) => {
  await prisma.persons.createMany({
    data: persons,
    skipDuplicates: true,
  });
};

const initGenresDB = async (genres: Genre[]) => {
  await prisma.genres.createMany({
    data: genres,
    skipDuplicates: true,
  });
};

const initCountriesDB = async (countries: Country[]) => {
  await prisma.countries.createMany({
    data: countries,
    skipDuplicates: true,
  });
};

const initLanguagesDB = async (languages: Language[]) => {
  await prisma.languages.createMany({
    data: languages,
    skipDuplicates: true,
  });
};

export {
  initPersonDB,
  initPersonsDB,
  initGenresDB,
  initCountriesDB,
  initLanguagesDB,
  initCompaniesDB,
  initMovieDB,
  initMoviesDB,
  initCastDB,
  initCrewDB,
  initReviewsDB,
  initSpokenLanguagesDB,
  initProductionCompaniesDB,
  initProductionCountriesDB,
  initReleaseDatesDB,
  initmovieGenresDB,
  initTranslationsDB,
};
