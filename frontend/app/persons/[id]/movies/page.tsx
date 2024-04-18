"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "react-feather";

import type { MovieResponse } from "@/services/movieService";

import { Section } from "@/components/section";

type Person = Awaited<ReturnType<typeof getPerson>>;
type Movie = Awaited<ReturnType<typeof getMoviesById>>;

const getPerson = async (personId: number) => {
  try {
    const response = await fetch("/api/persons/" + personId);
    const personData = await response.json();

    const { name, movieCast, movieCrew } = personData;

    const castMovieIds: number[] = movieCast.map((item: { movieId: number }) => item.movieId);
    const crewMovieIds: number[] = movieCrew.map((item: { movieId: number }) => item.movieId);
    const combinedMovieIds: number[] = [...castMovieIds, ...crewMovieIds];
    const movieIds: number[] = Array.from(new Set(combinedMovieIds));

    const person = {
      name: name,
      movieIds: movieIds,
    };

    return person;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

const getMoviesById = async (movieIds: number[]) => {
  const movies = [];
  const fetchedMovieIds = new Set<number>();

  async function fetchMovieById(movieId: number) {
    try {
      const response = await fetch(`/api/movies/${movieId}`);
      const movieData = (await response.json()) as MovieResponse;

      return movieData;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  }

  for (const movieId of movieIds) {
    if (!fetchedMovieIds.has(movieId)) {
      const movie = await fetchMovieById(movieId);

      if (movie) {
        movies.push(movie);
        fetchedMovieIds.add(movieId);
      }
    }
  }

  return movies;
};

export default function Movies({ params }: { params: { id: number } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [person, setPerson] = useState<Person | null>(null);
  const [movies, setMovies] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchData() {
      const personData: Person = await getPerson(params.id);
      setPerson(personData);

      if (personData) {
        setMovies(await getMoviesById(personData.movieIds));
      }

      setIsLoading(false);
    }

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="rotating-star">
        <Star />
      </main>
    );
  }

  if (!person) {
    notFound();
  }
  return (
    <main>
      <Section
        header={
          <div className="all-movies-header">
            Movies of <Link href={"/persons/" + params.id}>{person.name}</Link>
          </div>
        }
      >
        <div className="known-for-wrapper">
          {movies
            ? movies.map(movie => (
                <Link
                  key={movie.id}
                  href={"/movies/" + movie.id}
                >
                  <div
                    className="known-for-item"
                    style={{
                      background: `URL(${movie.poster_path}) grey`,
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                    }}
                  >
                    {/* Placeholder until we get movie posters */ movie.title}
                  </div>
                </Link>
              ))
            : null}
        </div>
      </Section>
    </main>
  );
}
