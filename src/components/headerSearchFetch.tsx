"use server";
import { getMoviesByTitle } from "@/services/movieService";

export const fetchSearchResults = async (searchWord: string) => {
  const movies = await getMoviesByTitle(searchWord);
  return movies;
};
