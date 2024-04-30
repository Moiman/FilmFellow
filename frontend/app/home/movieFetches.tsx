"use server";
import { getAllGenres, getMovieByLimitTypeGenre } from "@/services/movieService";

export const fetchMovies = async (limit: number, type: string, genre: string | undefined) => {
  try {
    const movies = await getMovieByLimitTypeGenre(limit, type, genre);

    const posters = movies?.map(movie => {
      return { id: movie.id, poster_path: movie.poster_path };
    });
    return posters;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export const fetchGenres = async () => {
  const genres = await getAllGenres();
  return genres;
};
