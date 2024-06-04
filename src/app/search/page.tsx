import { getAllGenres, getCountries, getLanguages } from "@/services/movieService";
import SearchFilters from "./searchFilters";

export default async function search() {
  return (
    <main className="sidebar-main">
      <SearchFilters
        genres={await getAllGenres()}
        languages={await getLanguages()}
        countries={await getCountries()}
      />
    </main>
  );
}
