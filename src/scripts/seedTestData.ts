import { readFileSync } from "fs";
import { gunzip } from "zlib";

import type { MoviesJSONdata } from "./fetchTestData.js";
import {
  initCastDB,
  initCompaniesDB,
  initCountriesDB,
  initCrewDB,
  initGenresDB,
  initImagesDB,
  initLanguagesDB,
  initMovieGenresDB,
  initMovieProvidersDB,
  initMoviesDB,
  initPersonsDB,
  initProductionCompaniesDB,
  initProductionCountriesDB,
  initReleaseDatesDB,
  initReviewsDB,
  initSpokenLanguagesDB,
  initTranslationsDB,
  initWatchProviderCountryPrioritiesDB,
  initWatchProvidersDB,
} from "../services/initService.js";

const testDataGzip = readFileSync("data/test-data.json.gz");
gunzip(testDataGzip, async (err, res) => {
  if (err) {
    throw err;
  }
  const testData = JSON.parse(res.toString()) as MoviesJSONdata;

  await initGenresDB(testData.genres);
  await initCountriesDB(testData.countries);
  await initLanguagesDB(testData.languages);
  await initPersonsDB(testData.persons);
  await initMoviesDB(testData.movies);
  await initReviewsDB(testData.reviews);
  await initCompaniesDB(testData.companies);
  await initSpokenLanguagesDB(testData.spokenLanguages);
  await initProductionCompaniesDB(testData.productionCompanies);
  await initProductionCountriesDB(testData.productionCountries);
  await initReleaseDatesDB(testData.releaseDates);
  await initTranslationsDB(testData.translations);
  await initMovieGenresDB(testData.movieGenres);
  await initCastDB(testData.casts);
  await initCrewDB(testData.crews);
  await initImagesDB(testData.images);
  await initWatchProvidersDB(testData.watchProviders);
  await initWatchProviderCountryPrioritiesDB(testData.watchProviderCountryPriorities);
  await initMovieProvidersDB(testData.movieProviders);
  console.log("Test data stored in database");
});
