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
  const [filterParams, setFilterParams] = useState<{ genre: String[]; country: String[]; language: String[] }>({
    genre: [],
    country: [],
    language: [],
  });

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>, test: string) => {
    if (test === "genre") {
      if (!event.target.checked) {
        setFilterParams(prevState => ({
          ...prevState,
          genre: prevState.genre.filter(genre => genre !== event.target.name),
        }));
      } else {
        setFilterParams(prevState => ({
          ...prevState,
          genre: [...prevState.genre, event.target.name],
        }));
      }
    }

    if (test === "country") {
      if (!event.target.checked) {
        setFilterParams(prevState => ({
          ...prevState,
          country: prevState.country.filter(country => country !== event.target.name),
        }));
      } else {
        setFilterParams(prevState => ({
          ...prevState,
          country: [...prevState.country, event.target.name],
        }));
      }
    }
    if (test === "language") {
      if (!event.target.checked) {
        setFilterParams(prevState => ({
          ...prevState,
          language: prevState.language.filter(language => language !== event.target.name),
        }));
      } else {
        setFilterParams(prevState => ({
          ...prevState,
          language: [...prevState.language, event.target.name],
        }));
      }
    }

    if (test === "") {
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

  console.log(filterParams);
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
                onChange={e => handleFilter(e, "genre")}
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
            name="movieLength"
            placeholder="0"
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
