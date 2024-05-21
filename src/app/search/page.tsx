import { MovieList } from "@/components/movieList";
import SearchFilters from "./layout";
import { fetchGenres } from "../movieFetches";
import { getAllGenres, getCountries, getLanguages } from "@/services/movieService";

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
  const countries = await getCountries();
  const languages = await getLanguages();

  return (
    <div>
      <SearchFilters
        genres={fetchedGenres}
        countries={countries}
        languages={languages}
      />
      <main>
        <MovieList movies={[]}></MovieList>
      </main>
    </div>
  );
}
