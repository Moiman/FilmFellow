"use client";

import { usePathname } from "next/navigation";
import Filter from "./filter";
import Link from "next/link";
import { Key } from "react";

// genres: string;
// releaseYear: string;
// counries: string;
// languages: string;
// budgetMin: string;
// budgetMax: string;
// studios: string;
// movieLengthMin: string;
// movieLengthMax: string;
// directors: string;
// actors: string;

export default function SearchFilters({ fetchedGenres }: { fetchedGenres: any }) {
  const currentPath = usePathname();

  return (
    <div className="filter-wrapper">
      <Filter title={"genres"}>
        {/* {fetchedGenres.map((genre: { id: Key | null | undefined }) => (
          <Link
            key={genre.id}
            href={"asd"}
          >
            genre.name
          </Link>
        ))} */}
        a
      </Filter>
      <Filter title={"Release year"}>
        <form>
          <input type="number"></input>
          <input type="number"></input>
        </form>
        <Link href={currentPath + "?releaseYear"}></Link>
      </Filter>
      <Filter title={"Counries"}>
        <Link href={currentPath + "?countries"}>
          <div>test</div>
        </Link>
      </Filter>
      <Filter title={"Languages"}>
        <Link href={currentPath + "?language"}>
          <div>test</div>
        </Link>
      </Filter>
      <Filter title={"Budget"}>
        <Link href={currentPath + "?budget"}>
          <div>test</div>
        </Link>
      </Filter>
      <Filter title={"Studios"}>
        <Link href={currentPath + "?studios"}>
          <div>test</div>
        </Link>
      </Filter>
      <Filter title={"Movie length"}>
        <Link href={currentPath + "?movieLength"}>
          <div>test</div>
        </Link>
      </Filter>
      <Filter title={"Directors"}>
        <Link href={currentPath + "?directors"}>
          <div>test</div>
        </Link>
      </Filter>
      <Filter title={"Actors"}>
        <Link href={currentPath + "?actors"}>
          <div>test</div>
        </Link>
      </Filter>
    </div>
  );
}
