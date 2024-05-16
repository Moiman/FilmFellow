import Image from "next/image";
import { useState } from "react";
import { Search } from "react-feather";

const placeholderMovies = [
  { name: "Movie 1", poster_path: "jf3YO8hOqGHCupsREf5qymYq1n.jpg", id: 1, year: "2000" },
  { name: "Movie 2", poster_path: "jf3YO8hOqGHCupsREf5qymYq1n.jpg", id: 2, year: "2000" },
  { name: "Movie 3", poster_path: "jf3YO8hOqGHCupsREf5qymYq1n.jpg", id: 3, year: "2000" },
];

export const HeaderSearch = () => {
  const placeholderResults = "";
  const [search, setSearch] = useState<string>("");

  console.log(placeholderResults);

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

      {search !== "" && (
        <div className="searchbar-results">
          {placeholderMovies.map(movie => (
            <button
              key={movie.id}
              className="searchbar-movie-result"
            >
              <Image
                alt={movie.name}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                width={35}
                height={50}
              />{" "}
              {movie.name} ({movie.year})
            </button>
          ))}

          <button className="searchbar-page-button">See all results for &quot;{search}&quot;</button>
        </div>
      )}
    </div>
  );
};
