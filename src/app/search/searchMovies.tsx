"use client";

import { useEffect, useState } from "react";
import { searchMovies } from "@/services/searchService";
import type { FilterParams } from "./searchFilters";
import { MovieList } from "@/components/movieList";
import SortSelector from "./sortSelector";

export default function SearchMovies({ filterParams }: { filterParams: FilterParams }) {
  const [movies, setMovies] = useState<Awaited<ReturnType<typeof searchMovies>>>([]);
  const [selectedSortOption, setSelectedSortOption] = useState("New");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function search() {
      filterParams.title = searchValue;
      setMovies(await searchMovies(selectedSortOption, filterParams));
    }
    search();
  }, [filterParams, selectedSortOption, searchValue]);

  return (
    <div
      className="section-wrapper"
      style={{ gap: "20px" }}
    >
      <div className="search-header">
        <form className="admin-searchbar">
          <input
            className="admin-searchbar-input"
            type="text"
            placeholder="Search by movie titles..."
            onChange={e => setSearchValue(e.currentTarget.value)}
            value={searchValue}
          />
        </form>

        <SortSelector
          selectedSortOption={selectedSortOption}
          setSelectedSortOption={setSelectedSortOption}
        />
      </div>

      <div className="search-results">
        {movies.length > 0 ? <MovieList movies={movies} /> : <p>No matching results.</p>}
      </div>
    </div>
  );
}
