"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Star } from "react-feather";

import type { MovieResponse } from "@/services/movieService";

import { Section } from "@/components/section";

type Person = Awaited<ReturnType<typeof getPerson>>;
type Movie = Awaited<ReturnType<typeof getMoviesById>>;

const getPerson = async (personId: number) => {
  try {
    const response = await fetch("/api/persons/" + personId);
    const personData = await response.json();

    const { name, biography, birthday, deathday, movieCast, movieCrew, profile_path, homepage } = personData;

    // Combine movie ids to one array
    const castMovieIds: number[] = movieCast.map((item: { movieId: number }) => item.movieId);
    const crewMovieIds: number[] = movieCrew.map((item: { movieId: number }) => item.movieId);
    const combinedMovieIds: number[] = [...castMovieIds, ...crewMovieIds];
    const movieIds: number[] = Array.from(new Set(combinedMovieIds));

    const person = {
      name: name,
      biography: biography,
      birthday: birthday,
      deathday: deathday,
      movieIds: movieIds,
      profile_path: profile_path,
      homepage: homepage,
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

      const { id, title, poster_path, vote_average } = movieData;

      return { id, title, poster_path, vote_average };
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

  movies.sort((a, b) => b.vote_average - a.vote_average);

  return movies.slice(0, 6);
};

export default function Person({ params }: { params: { id: number } }) {
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

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  return (
    <main style={{ padding: 0 }}>
      <div className="person-content">
        <div className="person-wrapper">
          <div
            className="img"
            style={{
              background: `URL(${person.profile_path}) grey`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          >
            <div className="gradient" />
          </div>

          <div className="person-info">
            <h5>
              {person.birthday ? formatDate(person.birthday) : "Birthday"} -{" "}
              {person.deathday ? formatDate(person.deathday) : ""}
            </h5>
            <h1>{person ? person.name : "Name"}</h1>
            <p className="person-description">{person.biography ? person.biography : "Biography"}</p>
          </div>
        </div>
        <div className="person-website">{person.homepage ? <Link href={person.homepage}>Homepage</Link> : null}</div>
      </div>

      <div className="section-padding">
        <Section
          header={
            <div className="known-for-header">
              <h4>Known for...</h4> <Link href={"/persons/" + params.id + "/movies"}>See all</Link>
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
      </div>
    </main>
  );
}
