import { MovieList } from "@/components/movieList";
import SearchFilters from "./searchFIlter";

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
  return (
    <main className="sidebar-main">
      <SearchFilters />

      <MovieList movies={[]}></MovieList>
    </main>
  );
}
