"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "react-feather";

import { getMoviesByTitle } from "@/services/movieService";

type SearchResult = {
  id: number;
  title: string;
  poster_path: string;
  release_date: Date | null;
};

// PLACEHOLDER LOGIC: Currently returns best rated movies that includes searched word in title
// Searches at maximum every 1 seconds so search isn't spammed on every input change
// "See all results" takes currently nowhere as there is no search page yet

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchDelay = setTimeout(() => {
      const getMovies = async () => {
        if (search.trim() === "") {
          setLoading(false);
          return;
        }

        getMoviesByTitle(search).then(movies => {
          setResults(movies);
          setLoading(false);
        });
      };

      getMovies();
    }, 1000);
    return () => clearTimeout(searchDelay);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const resetSearch = () => {
    setSearch("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div
      className="header-searchbar"
      ref={searchBarRef}
    >
      <input
        type="text"
        data-cy="search-input"
        className="searchbar-input"
        placeholder="Search for a movie..."
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setIsOpen(true);
          setLoading(true);
          setResults([]);
        }}
      />
      <button className="button-transparent">
        <Search
          className="searchbar-icon"
          size={20}
        />
      </button>

      {isOpen && search.length > 0 && (
        <div className="searchbar-results">
          {loading && <p className="searching-results">Searching for results...</p>}
          {results.map(movie => (
            <Link
              href={`/movies/${movie.id}`}
              className="movie-result"
              key={movie.id}
              onClick={resetSearch}
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
            </Link>
          ))}

          {!loading && results.length === 0 && <p className="searching-results">No results found.</p>}

          <Link
            href="/"
            className="searchbar-page-link"
            onClick={resetSearch}
          >
            See all results for &quot;{search}&quot;
          </Link>
        </div>
      )}
    </div>
  );
};
