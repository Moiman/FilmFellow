import { MovieList } from "@/components/home/test";
import { getMovieByLimitTypeGenre } from "@/services/movieService";

const fetchNewMovies = async () => {
  try {
    const test = await getMovieByLimitTypeGenre(7, "new", "action");

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
  const testing = await fetchNewMovies();

  return (
    <main>
      <MovieList movies={testing}></MovieList>
    </main>
  );
}
