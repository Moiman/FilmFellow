import { readFileSync } from "fs";
import { gunzip } from "zlib";

import type { MoviesJSONdata } from "./fetchTestData.js";
import {
  initCastDB,
  initCompaniesDB,
  initCountriesDB,
  initCrewDB,
  initGenresDB,
  initLanguagesDB,
  initMoviesDB,
  initPersonsDB,
  initProductionCompaniesDB,
  initProductionCountriesDB,
  initReleaseDatesDB,
  initReviewsDB,
  initSpokenLanguagesDB,
  initTranslationsDB,
  initmovieGenresDB,
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
  await initmovieGenresDB(testData.movieGenres);
  await initCastDB(testData.casts);
  await initCrewDB(testData.crews);
  console.log("Test data stored in database");
});
