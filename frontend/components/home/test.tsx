"use client";

import Image from "next/image";
import { Section } from "../section";
import Link from "next/link";

interface Movie {
  id: number;
  poster_path: string;
}

const getPosters = (moviesArr: Movie[]) => {
  if (moviesArr) {
    moviesArr.map(movie => {
      console.log(movie);
      <Image
        key={movie.id}
        className="poster"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt="picture of the movie poster"
        width={150}
        height={225}
      />;
    });
  } else {
    return null;
  }
};

export const MovieList = ({ movies }: { movies: any }) => {
  return (
    <div>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>New Movies</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{getPosters(movies)}</div>
      </Section>
    </div>
  );
};
