"use client";

import Filter from "./filter";
import { ChangeEvent, Key, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCountries, getLanguages } from "@/services/movieService";
import { fetchGenres } from "../movieFetches";

export default function SearchFilters() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [genres, setGenres] = useState([{ id: 0, name: "" }]);
  const [countries, setCountries] = useState([{ iso_3166_1: "", english_name: "", native_name: "" }]);
  const [languages, setLanguages] = useState([{ name: "", english_name: "", iso_639_1: "" }]);

  const handleFilter = (event: ChangeEvent<HTMLInputElement> | any, param: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = event.target.value.trim();

    if (!value) {
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
      setGenres(await fetchGenres());
      setCountries(await getCountries());
      setLanguages(await getLanguages());
    };

    fetch();
  }, []);

  return (
    <div className="filter-wrapper">
      <Filter title="genres">
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
      </Filter>
      <Filter title="Release year">
        <input
          onChange={e => handleFilter(e, e.target.name)}
          name="ReleaseYearMin"
          type="number"
        />
        <p>-</p>
        <input
          onChange={e => handleFilter(e, e.target.name)}
          name="ReleaseYearMax"
          type="number"
        />
      </Filter>
      <Filter title="Counries">
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
        <input
          type="number"
          name="budgetMin"
          onChange={e => handleFilter(e, e.target.name)}
        />
        <p>-</p>
        <input
          type="number"
          name="budgetMax"
          onChange={e => handleFilter(e, e.target.name)}
        />
      </Filter>
      <Filter title="Studios">
        <input
          type="text"
          name="studios"
          onChange={e => handleFilter(e, e.target.name)}
        />
      </Filter>
      <Filter title="Movie length">
        <div className="filter">
          <input
            type="number"
            name="movieLength"
            onChange={e => handleFilter(e, e.target.name)}
          />
          <p>minutes</p>
        </div>
      </Filter>
      <Filter title="Directors">
        <input
          type="text"
          name="directors"
          onChange={e => handleFilter(e, e.target.name)}
        />
      </Filter>
      <Filter title="Actors">
        <input
          type="text"
          name="Actors"
          onChange={e => handleFilter(e, e.target.name)}
        />
      </Filter>
      <Filter title="Rating">
        <form>
          <input
            type="checkbox"
            value={1}
            name="rating"
            onChange={e => handleFilter(e, e.target.name)}
          />
          <input
            type="checkbox"
            value={2}
            name="rating"
            onChange={e => handleFilter(e, e.target.name)}
          />
          <input
            type="checkbox"
            value={3}
            name="rating"
            onChange={e => handleFilter(e, e.target.name)}
          />
          <input
            type="checkbox"
            value={4}
            name="rating"
            onChange={e => handleFilter(e, e.target.name)}
          />
          <input
            type="checkbox"
            value={5}
            name="rating"
            onChange={e => handleFilter(e, e.target.name)}
          />
        </form>
      </Filter>
    </div>
  );
}
