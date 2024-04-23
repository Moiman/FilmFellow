import { MovieList } from "@/components/home/homeMovieList";
import { getMovieByLimitTypeGenre } from "@/services/movieService";

//väliäikaisesti käyttää genren mukaan hakua
const fetchNewMovies = async (limit: number, type: string, genre: string) => {
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

export default async function home() {
  const newMovies = await fetchNewMovies(7, "new", "action");
  const popularMovies = await fetchNewMovies(7, "popular", "action");
  const bestRatedMovies = await fetchNewMovies(7, "bestrated", "action");

  return (
    <main>
      <MovieList
        movies={newMovies}
        title="New"
      ></MovieList>
      <MovieList
        movies={popularMovies}
        title="Popular"
      ></MovieList>
      <MovieList
        movies={bestRatedMovies}
        title="Best Rated"
      ></MovieList>
    </main>
  );
}
