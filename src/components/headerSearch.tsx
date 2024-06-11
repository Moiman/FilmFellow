"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getMoviesByTitle } from "@/services/movieService";

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Awaited<ReturnType<typeof getMoviesByTitle>>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMovies = () => {
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
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
        placeholder="Search movies by title..."
        aria-label="Search movies by title"
        onFocus={() => setIsOpen(true)}
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setIsOpen(true);
          setLoading(true);
          setResults([]);
        }}
      />

      {isOpen && search.length > 0 && (
        <div className="searchbar-results">
          {loading && <p className="searching-results">Searching for results...</p>}
          {results.map(movie => (
            <Link
              href={`/movies/${movie.id}`}
              className="movie-result"
              key={movie.id}
              onClick={resetSearch}
              aria-label={movie.title}
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
            href="/search"
            className="searchbar-page-link"
            onClick={resetSearch}
          >
            Didn&rsquo;t find what you&rsquo;re looking for? Try advanced search.
          </Link>
        </div>
      )}
    </div>
  );
};
