"use server";
import { getAllGenres, getMovieByLimitTypeGenre } from "@/services/movieService";

export const fetchMovies = async (limit: number, type: string, genre: string) => {
  try {
    const test = await getMovieByLimitTypeGenre(limit, type, genre);

    const posters = test?.map(movie => {
      return { id: movie.id, poster_path: movie.poster_path };
    });
    return posters;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export const fetchGenres = async () => {
  try {
    const genres = await getAllGenres();
    return genres;
  } catch (error) {
    console.error("Error fetching genre data:", error);
    return null;
  }
};
