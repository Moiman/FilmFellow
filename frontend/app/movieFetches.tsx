"use server";
import { getAllGenres, getMovieByLimitTypeGenre } from "@/services/movieService";

export const fetchMovies = async (limit: number, type: string, genre: string | undefined) => {
  const movies = await getMovieByLimitTypeGenre(limit, type, genre);

  const posters = movies.map(movie => {
    return { id: movie.id, poster_path: movie.poster_path, title: movie.title };
  });
  return posters;
};

export const fetchGenres = async () => {
  const genres = await getAllGenres();
  return genres;
};
