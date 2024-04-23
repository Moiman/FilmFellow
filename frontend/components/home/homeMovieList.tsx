"use client";

import Image from "next/image";
import { Section } from "../section";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  poster_path: string;
}

export const MovieList = ({ movies, title }: { movies: any; title: string }) => {
  const [movieList, setMovieList] = useState<any>();

  useEffect(() => {
    const getPosters = (moviesArr: Movie[]) => {
      if (moviesArr) {
        const test = moviesArr.map(movie => {
          return (
            <Image
              key={movie.id}
              className="poster"
              //muuta pathi postereille omaan storageen jahka sellannen on
              src={`https://image.tmdb.org/t/p/original` + movie.poster_path}
              alt="picture of the movie poster"
              width={150}
              height={225}
            />
          );
        });

        setMovieList(test);
        console.log(test);
      } else {
        return null;
      }
    };
    getPosters(movies);
  }, [movies]);

  return (
    <div>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>{title}</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{movieList}</div>
      </Section>
    </div>
  );
};
