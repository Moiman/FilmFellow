"use client";

import { ChangeEvent, Key, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllGenres, getCountries, getLanguages } from "@/services/movieService";
import RatingStars from "./ratingStars";
import Filter from "./filter";

export default function SearchFilters() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [genres, setGenres] = useState([{ id: 0, name: "" }]);
  const [countries, setCountries] = useState([{ iso_3166_1: "", english_name: "", native_name: "" }]);
  const [languages, setLanguages] = useState([{ name: "", english_name: "", iso_639_1: "" }]);

  const handleFilter = (event: ChangeEvent<HTMLInputElement> | any, param: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!event.target.value || (!event.target.checked && event.target.type === "checkbox")) {
      current.delete(param);
    } else {
      current.set(param, event.target.value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathName}${query}`);
  };

  useEffect(() => {
    const fetch = async () => {
      setGenres(await getAllGenres());
      setCountries(await getCountries());
      setLanguages(await getLanguages());
    };

    fetch();
  }, []);

  return (
    <div className="filter-wrapper">
      <Filter title="Genres">
        <div className="genres">
          {genres.map((genre: { id: Key; name: string }) => (
            <div
              className="filter"
              key={genre.id}
            >
              <input
                type="checkbox"
                id={genre.name}
                onChange={e => handleFilter(e, genre.name)}
              />
              <p>{genre.name}</p>
            </div>
          ))}
        </div>
      </Filter>
      <Filter title="Release year">
        <div className="filter">
          <input
            onChange={e => handleFilter(e, e.target.name)}
            name="ReleaseYearMin"
            type="number"
            placeholder="Min"
          />
          <p>-</p>
          <input
            onChange={e => handleFilter(e, e.target.name)}
            name="ReleaseYearMax"
            type="number"
            placeholder="Max"
          />
        </div>
      </Filter>
      <Filter title="Countries">
        {countries.map((country: { iso_3166_1: Key; english_name: string }) => (
          <div
            className="filter"
            key={country.iso_3166_1}
          >
            <input
              type="checkbox"
              key={country.iso_3166_1}
              onClick={e => handleFilter(e, country.english_name)}
            />
            <p>{country.english_name}</p>
          </div>
        ))}
      </Filter>
      <Filter title="Languages">
        {languages.map((language: { iso_639_1: Key | null | undefined; english_name: string }) => (
          <div
            className="filter"
            key={language.iso_639_1}
          >
            <input
              type="checkbox"
              key={language.iso_639_1}
              onClick={e => handleFilter(e, language.english_name)}
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
            onChange={e => handleFilter(e, e.target.name)}
          />
          <p>-</p>
          <input
            type="number"
            name="budgetMax"
            placeholder="Max"
            onChange={e => handleFilter(e, e.target.name)}
          />
        </div>
      </Filter>
      <Filter title="Movie length">
        <div className="filter">
          <input
            type="number"
            name="movieLength"
            placeholder="Minutes"
            onChange={e => handleFilter(e, e.target.name)}
          />
        </div>
      </Filter>
      <Filter title="Rating">
        <div>
          <RatingStars
            stars={1}
            inputHandler={handleFilter}
          />
          <RatingStars
            stars={2}
            inputHandler={handleFilter}
          />
          <RatingStars
            stars={3}
            inputHandler={handleFilter}
          />
          <RatingStars
            stars={4}
            inputHandler={handleFilter}
          />
          <RatingStars
            stars={5}
            inputHandler={handleFilter}
          />
        </div>
      </Filter>
    </div>
  );
}
