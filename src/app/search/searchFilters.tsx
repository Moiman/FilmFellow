"use client";

import RatingStars from "./ratingStars";
import Filter from "./filter";
import { useState } from "react";

export default function SearchFilters({
  genres,
  countries,
  languages,
}: {
  genres: { id: number; name: string }[];
  countries: {
    iso_3166_1: string;
    english_name: string;
  }[];
  languages: {
    iso_639_1: string;
    english_name: string;
  }[];
}) {
  const [filterParams, setFilterParams] = useState<{ genres: String[]; countries: String[]; languages: String[] }>({
    genres: [],
    countries: [],
    languages: [],
  });

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    if (category === "genres") {
      if (!event.target.checked) {
        setFilterParams(prevState => ({
          ...prevState,
          genres: prevState.genres.filter(genres => genres !== event.target.name),
        }));
      } else {
        setFilterParams(prevState => ({
          ...prevState,
          genres: [...prevState.genres, event.target.name],
        }));
      }
    }

    if (category === "countries") {
      if (!event.target.checked) {
        setFilterParams(prevState => ({
          ...prevState,
          countries: prevState.countries.filter(countries => countries !== event.target.name),
        }));
      } else {
        setFilterParams(prevState => ({
          ...prevState,
          countries: [...prevState.countries, event.target.name],
        }));
      }
    }
    if (category === "languages") {
      if (!event.target.checked) {
        setFilterParams(prevState => ({
          ...prevState,
          languages: prevState.languages.filter(languages => languages !== event.target.name),
        }));
      } else {
        setFilterParams(prevState => ({
          ...prevState,
          languages: [...prevState.languages, event.target.name],
        }));
      }
    }

    if (category === "") {
      if (event.target.type === "checkbox") {
        const { name, checked } = event.target;
        setFilterParams(prevState => ({
          ...prevState,
          [name]: checked,
        }));
      } else {
        const { name, value } = event.target;
        setFilterParams(prevState => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  return (
    <div className="filter-wrapper">
      <Filter title="Genres">
        <div className="genres">
          {genres.map(genre => (
            <div
              className="filter"
              key={genre.id}
            >
              <input
                type="checkbox"
                id={genre.name}
                name={genre.name}
                onChange={e => handleFilter(e, "genres")}
              />
              <p>{genre.name}</p>
            </div>
          ))}
        </div>
      </Filter>
      <Filter title="Release year">
        <div className="filter">
          <input
            onChange={e => handleFilter(e, "")}
            name="releaseYearMin"
            type="number"
            placeholder="Min"
          />
          <p>-</p>
          <input
            onChange={e => handleFilter(e, "")}
            name="releaseYearMax"
            type="number"
            placeholder="Max"
          />
        </div>
      </Filter>
      <Filter title="Countries">
        {countries.map(country => (
          <div
            className="filter"
            key={country.iso_3166_1}
          >
            <input
              type="checkbox"
              name={country.english_name}
              key={country.iso_3166_1}
              onChange={e => handleFilter(e, "countries")}
            />
            <p>{country.english_name}</p>
          </div>
        ))}
      </Filter>
      <Filter title="Languages">
        {languages.map(language => (
          <div
            className="filter"
            key={language.iso_639_1}
          >
            <input
              type="checkbox"
              name={language.english_name}
              key={language.iso_639_1}
              onChange={e => handleFilter(e, "languages")}
            />
            <p>{language.english_name}</p>
          </div>
        ))}
      </Filter>
      <Filter title="Budget">
        <div className="filter">
          <input
            type="number"
            name="budgetMin"
            placeholder="Min"
            onChange={e => handleFilter(e, "")}
          />
          <p>-</p>
          <input
            type="number"
            name="budgetMax"
            placeholder="Max"
            onChange={e => handleFilter(e, "")}
          />
          <p>$</p>
        </div>
      </Filter>
      <Filter title="Movie length">
        <div className="filter">
          <input
            type="number"
            name="movieLengthMin"
            placeholder="Min"
            onChange={e => handleFilter(e, "")}
          />
          <p>-</p>
          <input
            type="number"
            name="movieLengthMax"
            placeholder="Max"
            onChange={e => handleFilter(e, "")}
          />
          <p>minutes</p>
        </div>
      </Filter>
      <Filter title="Rating">
        <div>
          {[1, 2, 3, 4, 5].map(stars => (
            <RatingStars
              key={stars}
              stars={stars}
              inputHandler={handleFilter}
            />
          ))}
        </div>
      </Filter>
    </div>
  );
}
