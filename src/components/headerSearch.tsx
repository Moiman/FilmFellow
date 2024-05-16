import Image from "next/image";
import { Search } from "react-feather";
import { getMovieByLimitTypeGenre } from "@/services/movieService";

export const HeaderSearch = async () => {
  const placeholderResults = await getMovieByLimitTypeGenre(4, "popular", undefined);
  const search = "";

  return (
    <div className="header-searchbar">
      <input
        type="text"
        data-cy="search-input"
        className="searchbar-input"
        placeholder="Search..."
      />
      <button className="button-transparent">
        <Search
          className="searchbar-icon"
          size={20}
        />
      </button>

      <div className="searchbar-results">
        {placeholderResults.map(movie => (
          <button
            key={movie.id}
            className="searchbar-movie-result"
          >
            <Image
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
    </div>
  );
};
