"use client";

import { MovieInfo } from "@/components/movies/movieInfo";
import { Section } from "@/components/section";

import { type MovieCrew, type Movies } from "@prisma/client";
import { notFound } from "next/navigation";

import { useEffect, useState } from "react";
import { Star } from "react-feather";

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [movie, setMovie] = useState<Movies | null>(null);
  const [directors, setDirectors] = useState<string[]>([]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movie = await fetch("/api/movies/" + params.id).then(response => response.json());

        if (!movie.error) {
          getDirectors(movie.crew);
          setMovie(movie);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    getMovie();
  }, [params.id]);

  async function getDirectors(crewArray: MovieCrew[]) {
    let directorIds: number[] = [];
    let directorNames: string[] = [];

    const directors = crewArray.filter(member => member.department === "Directing" && member.job === "Director");
    directorIds = directors.map(director => director.personId);

    const directorNameResponses = await Promise.all(
      directorIds.map(directorId => fetch("/api/persons/" + directorId).then(response => response.json())),
    );

    directorNames = directorNameResponses.map(response => response.name);
    setDirectors(directorNames);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <main className="rotating">
        <Star />
      </main>
    );
  } else if (!isLoading && !movie) {
    notFound();
  }

  if (!movie) {
    notFound();
  }

  return (
    <main style={{ padding: 0 }}>
      <MovieInfo
        movie={movie}
        directors={directors}
      />

      <div className="section-padding">
        <Section header="Cast">
          <p>Coming soon</p>
        </Section>

        <Section header="Crew">
          <p>Coming soon</p>
        </Section>

        <Section header="Reviews">
          <p>Coming soon</p>
        </Section>

        <Section header="In theaters">
          <p>Coming soon</p>
        </Section>

        <Section header="Similar movies">
          <p>Coming soon</p>
        </Section>
      </div>
    </main>
  );
}
