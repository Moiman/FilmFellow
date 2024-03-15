// import { fetchMovie } from "./initMovies.js";

interface MovieListResponse {
  page: number;
  results: {
    id: number;
  }[];
}

const apiKey = process.env.API_KEY;

const apiKeyUrl = `?api_key=${apiKey}`;
const topRatedUrl = "https://api.themoviedb.org/3/movie/top_rated" + apiKeyUrl;

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
