import { MovieList } from "@/components/movieList";
import SearchFilters from "./layout";
import { fetchGenres } from "../movieFetches";

export default async function search({
  searchParams,
}: {
  searchParams?: {
    genres: string;
    releaseYear: string;
    counries: string;
    languages: string;
    budgetMin: string;
    budgetMax: string;
    studios: string;
    movieLengthMin: string;
    movieLengthMax: string;
    directors: string;
    actors: string;
  };
}) {
  const fetchedGenres = await fetchGenres();

  return (
    <div>
      <SearchFilters fetchedGenres={fetchedGenres} />
      <main>
        <MovieList movies={[]}></MovieList>
      </main>
    </div>
  );
}
