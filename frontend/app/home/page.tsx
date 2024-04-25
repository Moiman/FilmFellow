import { MovieList } from "@/app/home/homeMovieList";
import { fetchGenres, fetchMovies } from "./movieFetches";
import { Dropdown } from "@/components/dropdown";

export default async function home() {
  const newMovies = await fetchMovies(6, "new", "action");
  const popularMovies = await fetchMovies(6, "popular", "action");
  const bestRatedMovies = await fetchMovies(6, "bestrated", "action");
  const genres = await fetchGenres();

  return (
    <main>
      <MovieList />
    </main>
  );
}
