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
