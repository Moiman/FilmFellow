import fs from "fs";
import { type MovieDataType, fetchMoviesData } from "./initMovies.js";

interface MovieListResponse {
  page: number;
  results: {
    id: number;
  }[];
}

const movies: MovieDataType[] = [];

// eslint-disable-next-line @typescript-eslint/require-await
export const storeJSON = async (movie: MovieDataType) => {
  movies.push(movie);
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

console.log(topRatedMovieIdArray.length);

await fetchMoviesData(topRatedMovieIdArray, storeJSON);

// Wait for all requests to finnish
while (topRatedMovieIdArray.length !== movies.length) {
  await new Promise(resolve => setTimeout(resolve, 10));
}

console.log(movies.length);
const personIds = new Set();

movies.forEach(movie => {
  movie.cast.forEach(person => personIds.add(person.personId));
  movie.crew.forEach(person => personIds.add(person.personId));
});

console.log(personIds.size);

const companiesMap = new Map<number, MovieDataType["companies"][0]>();

movies.forEach(movie => movie.companies.forEach(company => companiesMap.set(company.id, company)));

console.log(companiesMap.size);

const moviesJSONdata = {
  movies: movies.map(movie => movie.movie),
  movieGenres: movies.map(movie => movie.movieGenres),
  companies: [...companiesMap.values()],
  productionCompanies: movies.map(movie => movie.productionCompanies),
  productionCountries: movies.map(movie => movie.productionCountries),
  spokenLanguages: movies.map(movie => movie.spokenLanguages),
  reviews: movies.map(movie => movie.reviews),
  casts: movies.map(movie => movie.cast),
  crews: movies.map(movie => movie.crew),
  releaseDates: movies.map(movie => movie.releaseDates),
  translations: movies.reduce(
    (translations, movie) => (movie.translation ? translations.concat(movie.translation) : translations),
    [] as MovieDataType["translation"][],
  ),
};

console.log("Writing 'test-data.json' file");
fs.writeFileSync("test-data.json", JSON.stringify(moviesJSONdata, null, 2));
