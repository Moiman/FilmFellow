"use client";

import { Section } from "@/components/section";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "react-feather";

type Person = Awaited<ReturnType<typeof getPerson>>;

const getPerson = async (personId: number) => {
  try {
    const response = await fetch("/api/persons/" + personId);
    const personData = await response.json();

    const { name, biography, birthday, deathday, movieCast, movieCrew, profile_path, homepage } = personData;

    const person = {
      name: name,
      biography: biography,
      birthday: birthday,
      deathday: deathday,
      movieCast: movieCast,
      movieCrew: movieCrew,
      profile_path: profile_path,
      homepage: homepage,
    };

    return person;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

const getMoviesById = async (person: Person) => {
  const allMovieIds = [];
  const movies = [];

  async function fetchMovieById(movieId: number) {
    try {
      const response = await fetch(`/api/movies/${movieId}`);
      const movieData = await response.json();
      const { id, title, poster_path, vote_average } = movieData;
      return { id, title, poster_path, vote_average };
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  }

  for (const cast of person.movieCast) {
    if (!allMovieIds.includes(cast.movieId)) {
      allMovieIds.push(cast.movieId);
    }
  }
  for (const crew of person.movieCrew) {
    if (!allMovieIds.includes(crew.movieId)) {
      allMovieIds.push(crew.movieId);
    }
  }

  const moviePromises = allMovieIds.map(movieId => fetchMovieById(movieId));
  const allMovies = await Promise.all(moviePromises);

  allMovies.sort((a, b) => b.vote_average - a.vote_average);
  movies.push(...allMovies.slice(0, 6));

  return movies;
};

export default function Person({ params }: { params: { id: number } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [person, setPerson] = useState<Person | null>(null);
  const [movies, setMovies] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const personData: Person = await getPerson(params.id);
      setPerson(personData);
      setMovies(await getMoviesById(personData));
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
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <main style={{ padding: 0 }}>
      <div className="person-content">
        <div className="person-wrapper">
          <div
            className="img"
            style={{
              background: `URL(https://media.themoviedb.org/t/p/w500/bNc908d59Ba8VDNr4eCcm4G1cR.jpg)`,
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
        <div className="person-website">{person.homepage ? <Link href={person.homepage}>WWW</Link> : null}</div>
      </div>

      <div className="section-padding">
        <Section header="Known for...">
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
                      {movie.title}
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
