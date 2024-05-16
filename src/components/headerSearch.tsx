"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Search } from "react-feather";

import { fetchMovies } from "@/app/movieFetches";

type SearchResult = {
  id: number;
  title: string;
  poster_path: string;
  release_date: Date | null;
};

export const HeaderSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const getMovies = async () => {
        if (search.trim() === "") {
          setResults([]);
          return;
        }
        const movies = await fetchMovies(4, search, undefined);
        console.log(movies);
        setResults(movies);
      };

      getMovies();
    }, 300); // Delay to debounce

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="header-searchbar">
      <input
        type="text"
        data-cy="search-input"
        className="searchbar-input"
        placeholder="Search..."
        onChange={e => setSearch(e.target.value)}
      />
      <button className="button-transparent">
        <Search
          className="searchbar-icon"
          size={20}
        />
      </button>

      {results.length > 0 && (
        <div className="searchbar-results">
          {results.map(movie => (
            <button
              className="searchbar-movie-result"
              key={movie.id}
              onClick={() => {
                setResults([]);
                router.push(`/movies/${movie.id}`);
              }}
            >
              <Image
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                width={35}
                height={50}
              />
              <div className="result-title">
                <span>{movie.title}</span> ({movie.release_date?.getFullYear()})
              </div>
            </button>
          ))}

          <button className="searchbar-page-button">See all results for &quot;{search}&quot;</button>
        </div>
      )}
    </div>
  );
};
