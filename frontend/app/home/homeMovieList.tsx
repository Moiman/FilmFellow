"use client";

import { Dropdown } from "@/components/dropdown";
import { Section } from "@/components/section";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchGenres, fetchMovies } from "./movieFetches";

export const MovieList = () => {
  const [newMovieList, setNewMovieList] = useState<any>();
  const [popularMovieList, setPopularMovieList] = useState<any>();
  const [bestratedMovieList, setBestratedMovieList] = useState<any>();
  const [allgenres, setAllGenres] = useState<any>();
  const [selectedGenre, setSelectedGenre] = useState("action");

  const getPosters = async (setMovieList: any, type: string, genre: string) => {
    const moviesArr = await fetchMovies(6, type, genre);
    if (moviesArr) {
      const test = moviesArr.map((movie: { id: number; poster_path: string }) => {
        return (
          <Link
            key={movie.id}
            href={"/movies/" + movie.id}
          >
            <Image
              key={movie.id}
              className="poster"
              //muuta pathi postereille omaan storageen jahka sellannen on
              src={`https://image.tmdb.org/t/p/original` + movie.poster_path}
              alt="picture of the movie poster"
              width={150}
              height={225}
            />
          </Link>
        );
      });
      setMovieList(test);
    }
  };

  const getGenres = async () => {
    setAllGenres(await fetchGenres());
  };

  useEffect(() => {
    getPosters(setNewMovieList, "new", selectedGenre);
    getPosters(setPopularMovieList, "popular", selectedGenre);
    getPosters(setBestratedMovieList, "bestrated", selectedGenre);
  }, [selectedGenre]);

  return (
    <div>
      <Dropdown>
        <div>{allgenres}</div>
      </Dropdown>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>{"title"}</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{newMovieList}</div>
      </Section>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>{"title"}</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{popularMovieList}</div>
      </Section>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>{"title"}</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{bestratedMovieList}</div>
      </Section>
    </div>
  );
};
