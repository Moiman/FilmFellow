"use client";

import { Dropdown } from "@/components/dropdown";
import { Section } from "@/components/section";
import Image from "next/image";

import Link from "next/link";
import { JSX, SetStateAction, useEffect, useState } from "react";
import { fetchGenres, fetchMovies } from "./movieFetches";

export const MovieList = () => {
  const [newMovieList, setNewMovieList] = useState<JSX.Element[]>();
  const [popularMovieList, setPopularMovieList] = useState<JSX.Element[]>();
  const [bestratedMovieList, setBestratedMovieList] = useState<JSX.Element[]>();
  const [allgenres, setAllGenres] = useState<JSX.Element[]>();
  const [selectedGenre, setSelectedGenre] = useState("action");

  const getPosters = async (
    setMovieList: {
      (value: SetStateAction<JSX.Element[] | undefined>): void;
      (arg0: JSX.Element[]): void;
    },
    type: string,
    genre: string,
  ) => {
    const moviesArr = await fetchMovies(7, type, genre);
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
    const tempgenres = await fetchGenres();

    const temp = tempgenres?.map(genre => {
      return (
        <p
          key={genre.id}
          onClick={() => setSelectedGenre(genre.name)}
        >
          {genre.name}
        </p>
      );
    });
    setAllGenres(temp);
  };

  useEffect(() => {
    getGenres();
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
            <h3>{"New Movies"}</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{newMovieList}</div>
      </Section>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>{"Popular Movies"}</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{popularMovieList}</div>
      </Section>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>{"Best Rated Movies"}</h3>
            <Link href={"/new"}>See all</Link>
          </div>
        }
      >
        <div className="poster-list">{bestratedMovieList}</div>
      </Section>
    </div>
  );
};
