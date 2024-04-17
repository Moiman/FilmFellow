import { PrismaClient } from "@prisma/client";
import type {
  Countries,
  Genres,
  Images,
  Languages,
  MovieProviders,
  Persons,
  WatchProviderCountryPriorities,
  WatchProviders,
} from "@prisma/client";
import type { MovieDataType } from "../scripts/fetchMovies.js";

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
  const validCountries = (await prisma.countries.findMany({ select: { iso_3166_1: true } })).map(
    country => country.iso_3166_1,
  );
  const validReleaseDates = releaseDates.filter(releaseDate => validCountries.includes(releaseDate.iso_3166_1));

  await prisma.releaseDates.createMany({
    data: validReleaseDates,
    skipDuplicates: true,
  });
};

const initTranslationsDB = async (translations: NonNullable<MovieDataType["translation"]>[]) => {
  await prisma.translations.createMany({
    data: translations,
    skipDuplicates: true,
  });
};

const initMovieGenresDB = async (movieGenres: MovieDataType["movieGenres"]) => {
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

const initImagesDB = async (images: Images[]) => {
  await prisma.images.createMany({
    data: images,
    skipDuplicates: true,
  });
};

const initPersonDB = async (person: Persons) => {
  await prisma.persons.upsert({
    where: {
      id: person.id,
    },
    create: person,
    update: person,
  });
};

const initPersonsDB = async (persons: Persons[]) => {
  await prisma.persons.createMany({
    data: persons,
    skipDuplicates: true,
  });
};

const initGenresDB = async (genres: Genres[]) => {
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

const initWatchProvidersDB = async (watchProviders: WatchProviders[]) => {
  await prisma.watchProviders.createMany({
    data: watchProviders,
    skipDuplicates: true,
  });
};

const initWatchProviderCountryPrioritiesDB = async (
  watchProviderCountryPriorities: WatchProviderCountryPriorities[],
) => {
  const validCountries = (await prisma.countries.findMany({ select: { iso_3166_1: true } })).map(
    country => country.iso_3166_1,
  );
  const validWatchProviderCountryPriorities = watchProviderCountryPriorities.filter(providerCountry =>
    validCountries.includes(providerCountry.iso_3166_1),
  );
  await prisma.watchProviderCountryPriorities.createMany({
    data: validWatchProviderCountryPriorities,
    skipDuplicates: true,
  });
};

const initMovieProvidersDB = async (movieProviders: MovieProviders[]) => {
  const validCountries = (await prisma.countries.findMany({ select: { iso_3166_1: true } })).map(
    country => country.iso_3166_1,
  );
  const validMovieProviders = movieProviders.filter(movieProvider => validCountries.includes(movieProvider.iso_3166_1));

  await prisma.movieProviders.createMany({
    data: validMovieProviders,
    skipDuplicates: true,
  });
};

export {
  initCastDB,
  initCompaniesDB,
  initCountriesDB,
  initCrewDB,
  initGenresDB,
  initImagesDB,
  initLanguagesDB,
  initMovieDB,
  initMovieGenresDB,
  initMovieProvidersDB,
  initMoviesDB,
  initPersonDB,
  initPersonsDB,
  initProductionCompaniesDB,
  initProductionCountriesDB,
  initReleaseDatesDB,
  initReviewsDB,
  initSpokenLanguagesDB,
  initTranslationsDB,
  initWatchProviderCountryPrioritiesDB,
  initWatchProvidersDB,
};
