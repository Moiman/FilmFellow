"use client";

import { Section } from "@/components/section";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "react-feather";

type Person = Awaited<ReturnType<typeof getPerson>>;

const getPerson = async (personId: number) => {
  try {
    const res = await fetch("/api/persons/" + personId);
    const personData = await res.json();

    const { name, biography, birthday, deathday, movieCast, movieCrew, profile_path } = personData;

    const person = {
      name: name,
      biography: biography,
      birthday: birthday,
      deathday: deathday,
      movieCast: movieCast,
      movieCrew: movieCrew,
      profile_path: profile_path,
    };

    return person;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

const getMoviesById = async (person: Person) => {
  const movies = [];

  async function fetchMovieById(movieId: number) {
    try {
      const response = await fetch(`/api/movies/${movieId}`);
      const movieData = await response.json();
      const { id, title, poster_path } = movieData;
      return { id, title, poster_path };
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  }

  for (const cast of person.movieCast) {
    const movieId = cast.movieId;
    if (!movies.some(movie => movie.id === movieId)) {
      const movie = await fetchMovieById(movieId);
      if (movie) {
        movies.push(movie);
      }
    }
  }

  for (const crew of person.movieCrew) {
    const movieId = crew.movieId;
    if (!movies.some(movie => movie.id === movieId)) {
      const movie = await fetchMovieById(movieId);
      if (movie) {
        movies.push(movie);
      }
    }
  }

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
              background: `URL(${person.profile_path})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="gradient" />
          </div>

          <div className="person-info">
            <h4>
              {person.birthday ? formatDate(person.birthday) : "Birthday"} -{" "}
              {person.deathday ? formatDate(person.deathday) : ""}
            </h4>
            <h1>{person ? person.name : "Name"}</h1>
            <p className="person-description">{person.biography ? person.biography : "Biography"}</p>
          </div>
        </div>
      </div>

      <div className="section-padding">
        <Section header="Known for...">
          <>
            {movies
              ? movies.map(movie => (
                  <Link
                    key={movie.id}
                    href={"/movies/" + movie.id}
                  >
                    {movie.title}
                  </Link>
                ))
              : null}
          </>
        </Section>
      </div>
    </main>
  );
}
