"use client";

import { useEffect, useState } from "react";
import { searchMovies } from "@/services/searchService";
import type { FilterParams } from "./searchFilters";
import { Section } from "@/components/section";
import { MovieList } from "@/components/movieList";
import SortSelector from "./sortSelector";

export default function SearchMovies({ filterParams }: { filterParams: FilterParams }) {
  const [movies, setMovies] = useState<Awaited<ReturnType<typeof searchMovies>>>([]);
  const [selectedSortOption, setSelectedSortOption] = useState("New");

  useEffect(() => {
    async function search() {
      setMovies(await searchMovies(selectedSortOption, filterParams));
    }
    search();
  }, [filterParams, selectedSortOption]);

  return (
    <div className="section-wrapper">
      <SortSelector
        selectedSortOption={selectedSortOption}
        setSelectedSortOption={setSelectedSortOption}
      />
      <Section header={"Best Rated"}>
        <MovieList movies={movies} />
      </Section>
    </div>
  );
}
