"use client";

import Filter from "./filter";
import Link from "next/link";
import { Key } from "react";

export default function SearchFilters({
  genres,
  countries,
  languages,
}: {
  genres: any;
  countries: any;
  languages: any;
}) {
  return (
    <div className="filter-wrapper">
      <Filter title={"genres"}>
        <form>
          {genres.map((genre: { id: Key | null | undefined; name: string | undefined }) => (
            <div key={genre.id}>
              <title>{genre.name}</title>
              <input
                type="checkbox"
                title={genre.name}
                name={genre.name}
                value={genre.name}
              />
            </div>
          ))}
        </form>
      </Filter>
      <Filter title={"Release year"}>
        <form>
          <input type="number"></input>
          <input type="number"></input>
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
              {country.english_name}{" "}
            </Link>
          ))}
        </div>
      </Filter>
      <Filter title={"Languages"}>
        {languages.map((language: { iso_639_1: Key | null | undefined; english_name: string }) => (
          <Link
            key={language.iso_639_1}
            href={"?language"}
          >
            {language.english_name}
          </Link>
        ))}
      </Filter>
      <Filter title={"Budget"}>
        <form>
          <input type="number"></input>
          <input type="number"></input>
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
            value="movieLength"
            name="movieLength"
          ></input>
        </form>
      </Filter>
      <Filter title={"Directors"}>
        <form>
          <input
            type="text"
            value="directors"
            name="directors"
          ></input>
        </form>
      </Filter>
      <Filter title={"Actors"}>
        <form>
          <input
            type="text"
            value="Actors"
            name="Actors"
          ></input>
        </form>
      </Filter>
    </div>
  );
}
