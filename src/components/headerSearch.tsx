"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "react-feather";

import { getMoviesByTitle } from "@/services/movieService";

type SearchResult = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: Date | null;
};

// PLACEHOLDER LOGIC: Currently returns movies that includes searched word in title
// Searches at maximum every 1 seconds so search isn't spammed on every input change

export const HeaderSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const searchDelay = setTimeout(() => {
      const getMovies = async () => {
        if (search.trim() === "") {
          setResults([]);
          setLoading(false);
          return;
        }
        const movies = await getMoviesByTitle(search);
        setResults(movies);
        setLoading(false);
      };

      getMovies();
    }, 1000);

    return () => clearTimeout(searchDelay);
  }, [search]);

  return (
    <div className="header-searchbar">
      <input
        type="text"
        data-cy="search-input"
        className="searchbar-input"
        placeholder="Search..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setLoading(true);
        }}
      />
      <button className="button-transparent">
        <Search
          className="searchbar-icon"
          size={20}
        />
      </button>

      {search.length > 0 && (
        <div className="searchbar-results">
          {results.map(movie => (
            <button
              className="searchbar-movie-result"
              key={movie.id}
              onClick={() => {
                setSearch("");
                setResults([]);
                router.push(`/movies/${movie.id}`);
              }}
            >
              <Image
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w92/${movie.posterPath}`}
                width={35}
                height={50}
              />
              <div className="result-title">
                <span>{movie.title}</span> ({movie.releaseDate?.getFullYear()})
              </div>
            </button>
          ))}

          {loading && <p className="searchbar-searching">Searching for results...</p>}
          {!loading && results.length === 0 && <p className="searchbar-searching">No results found.</p>}

          <button
            className="searchbar-page-button"
            onClick={() => {
              setSearch("");
              setResults([]);
              router.push("/");
            }}
          >
            See all results for &quot;{search}&quot;
          </button>
        </div>
      )}
    </div>
  );
};
