"use client";

import { Key, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllGenres, getCountries, getLanguages } from "@/services/movieService";
import RatingStars from "./ratingStars";
import Filter from "./filter";

export default function SearchFilters() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [genres, setGenres] = useState<{ id: number; name: string }[]>();
  const [countries, setCountries] = useState<{ iso_3166_1: string; english_name: string; native_name: string }[]>();
  const [languages, setLanguages] = useState<{ name: string; english_name: string; iso_639_1: string }[]>();

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>, param: string) => {
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
          {genres &&
            genres.map((genre: { id: Key; name: string }) => (
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
            name="releaseYearMin"
            type="number"
            placeholder="Min"
          />
          <p>-</p>
          <input
            onChange={e => handleFilter(e, e.target.name)}
            name="releaseYearMax"
            type="number"
            placeholder="Max"
          />
        </div>
      </Filter>
      <Filter title="Countries">
        {countries &&
          countries.map((country: { iso_3166_1: Key; english_name: string }) => (
            <div
              className="filter"
              key={country.iso_3166_1}
            >
              <input
                type="checkbox"
                name={country.english_name}
                key={country.iso_3166_1}
                onChange={e => handleFilter(e, country.english_name)}
              />
              <p>{country.english_name}</p>
            </div>
          ))}
      </Filter>
      <Filter title="Languages">
        {languages &&
          languages.map((language: { iso_639_1: Key; english_name: string }) => (
            <div
              className="filter"
              key={language.iso_639_1}
            >
              <input
                type="checkbox"
                name={language.english_name}
                key={language.iso_639_1}
                onChange={e => handleFilter(e, language.english_name)}
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
