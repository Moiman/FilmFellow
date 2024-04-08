import { createWriteStream } from "fs";
import { createGzip } from "zlib";
import { Readable } from "stream";
import type { Persons } from "@prisma/client";
import { type MovieDataType, fetchMoviesData } from "./fetchMovies.js";
import { fetchPersonsData } from "./fetchPersons.js";
import { fetchCountries, fetchGenres, fetchLanguages, fetchProviders } from "./fetchOtherData.js";
import type { MovieListResponse } from "./types.js";

export type MoviesJSONdata = Awaited<ReturnType<typeof fetchTestData>>;

const fetchTestData = async () => {
  const movies: MovieDataType[] = [];

  const persons: Persons[] = [];

  const storeMovie = (movie: MovieDataType) => {
    movies.push(movie);
  };

  const storePerson = (person: Persons) => {
    persons.push(person);
  };

  const apiKey = process.env.API_KEY;

  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

  const topRatedMovieIdArray: number[] = [];

  // 20 movie per page 20*5=100
  for (let page = 1; page < 6; page++) {
    try {
      const response = await fetch(topRatedUrl + "&page=" + page);
      const moviesList = (await response.json()) as MovieListResponse;
      moviesList.results.forEach(movie => topRatedMovieIdArray.push(movie.id));
    } catch (err) {
      console.log("Failed to load page", page);
      throw err;
    }
  }

  console.log("Fetching", topRatedMovieIdArray.length, "movies");

  await fetchMoviesData(topRatedMovieIdArray, storeMovie);

  // Wait for all requests to finnish
  let waitedSecs = 0;
  while (topRatedMovieIdArray.length !== movies.length) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    waitedSecs++;
    if (waitedSecs > 100) {
      throw "Failed to get movies. Timeout 100 secs";
    }
  }

  const personIds = new Set<number>();

  movies.forEach(movie => {
    movie.cast.forEach(person => personIds.add(person.personId));
    movie.crew.forEach(person => personIds.add(person.personId));
  });

  console.log("Fetching", personIds.size, "persons");

  await fetchPersonsData(Array.from(personIds.values()), storePerson);
  waitedSecs = 0;
  while (personIds.size !== persons.length) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    waitedSecs++;
    if (waitedSecs > 100) {
      throw "Failed to get persons. Timeout 100 secs";
    }
  }

  const companiesMap = new Map<number, MovieDataType["companies"][0]>();

  movies.forEach(movie => movie.companies.forEach(company => companiesMap.set(company.id, company)));

  const genres = await fetchGenres();
  const countries = await fetchCountries();
  const languages = await fetchLanguages();
  const providers = await fetchProviders();

  const moviesJSONdata = {
    genres,
    countries,
    languages,
    persons,
    watchProviders: providers.watchProviders,
    watchProviderCountryPriorities: providers.watchProviderCountryPriorities,
    movieProviders: movies.flatMap(movie => movie.movieProviders),
    movies: movies.map(movie => movie.movie),
    movieGenres: movies.flatMap(movie => movie.movieGenres),
    companies: Array.from(companiesMap.values()),
    productionCompanies: movies.flatMap(movie => movie.productionCompanies),
    productionCountries: movies.flatMap(movie => movie.productionCountries),
    spokenLanguages: movies.flatMap(movie => movie.spokenLanguages),
    reviews: movies.flatMap(movie => movie.reviews),
    casts: movies.flatMap(movie => movie.cast),
    crews: movies.flatMap(movie => movie.crew),
    releaseDates: movies.flatMap(movie => movie.releaseDates),
    translations: movies.reduce(
      (translations, movie) => (movie.translation ? translations.concat(movie.translation) : translations),
      [] as NonNullable<MovieDataType["translation"]>[],
    ),
    images: movies.flatMap(movie => movie.images),
  };

  Readable.from([JSON.stringify(moviesJSONdata)])
    .pipe(createGzip())
    .pipe(createWriteStream("data/test-data.json.gz"))
    .on("finish", () => console.log("Created 'data/test-data.json.gz' file"));

  return moviesJSONdata;
};

fetchTestData();
