"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import RatingStars from "./ratingStars";
import Filter from "./filter";

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
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>, params: string) => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

    if (!event.target.value || (!event.target.checked && event.target.type === "checkbox")) {
      currentParams.delete(params);
    } else {
      currentParams.set(params, event.target.value);
    }

    const search = currentParams.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathName}${query}`);
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
        {countries.map(country => (
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
        {languages.map(language => (
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
          <p>$</p>
        </div>
      </Filter>
      <Filter title="Movie length">
        <div className="filter">
          <input
            type="number"
            name="movieLength"
            placeholder="0"
            onChange={e => handleFilter(e, e.target.name)}
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
