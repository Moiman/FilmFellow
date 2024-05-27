"use client";

import Filter from "./filter";
import Link from "next/link";
import { ChangeEvent, Key, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCountries, getLanguages } from "@/services/movieService";
import { fetchGenres } from "../movieFetches";

export default function SearchFilters() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [genres, setGenres] = useState([{ id: 0, name: "" }]);
  const [selectedGenres, setSelectedGenres] = useState([""]);
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

  const handleGenres = (event: ChangeEvent<HTMLInputElement>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = event.target.value.trim();

    setSelectedGenres((prevState: any) => {
      return {
        ...prevState,
        value,
      };
    });

    const genres = selectedGenres.toString();

    if (!selectedGenres) {
      current.delete("genres");
    } else {
      current.set("genres", genres);
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
      <Filter title={"genres"}>
        <form id="genre">
          {genres.map((genre: { id: Key | null | undefined; name: string | undefined }) => (
            <div key={genre.id}>
              <p>{genre.name}</p>
              <input
                type="checkbox"
                id={genre.name}
                value={genre.name}
                onChange={e => handleGenres(e)}
              />
            </div>
          ))}
        </form>
      </Filter>
      <Filter title={"Release year"}>
        <form>
          <input
            onChange={e => handleFilter(e, e.target.name)}
            name="ReleaseYearMin"
            type="number"
          ></input>
          <input
            onChange={e => handleFilter(e, e.target.name)}
            name="ReleaseYearMax"
            type="number"
          ></input>
        </form>
        <Link href={"?releaseYear"}></Link>
      </Filter>
      <Filter title={"Counries"}>
        <div>
          {countries.map((country: { iso_3166_1: Key | null | undefined; english_name: string }) => (
            <Link
              key={country.iso_3166_1}
              href={"?countries"}
            >
              {country.english_name}
            </Link>
          ))}
        </div>
      </Filter>
      <Filter title={"Languages"}>
        <div>
          {languages.map((language: { iso_639_1: Key | null | undefined; english_name: string }) => (
            <Link
              key={language.iso_639_1}
              href={"?language"}
            >
              {language.english_name}
            </Link>
          ))}
        </div>
      </Filter>
      <Filter title={"Budget"}>
        <form>
          <input
            type="number"
            name="budgetMin"
            onChange={e => handleFilter(e, e.target.name)}
          ></input>
          <input
            type="number"
            name="budgetMax"
            onChange={e => handleFilter(e, e.target.name)}
          ></input>
        </form>
      </Filter>
      <Filter title={"Studios"}>
        <Link href={"?studios"}>
          <div>test</div>
        </Link>
      </Filter>
      <Filter title={"Movie length"}>
        <form>
          <input
            type="number"
            name="movieLength"
            onChange={e => handleFilter(e, e.target.name)}
          ></input>
        </form>
      </Filter>
      <Filter title={"Directors"}>
        <form>
          <input
            type="text"
            name="directors"
            onChange={e => handleFilter(e, e.target.name)}
          ></input>
        </form>
      </Filter>
      <Filter title={"Actors"}>
        <form>
          <input
            type="text"
            name="Actors"
            onChange={e => handleFilter(e, e.target.name)}
          ></input>
        </form>
      </Filter>
    </div>
  );
}
