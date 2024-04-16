"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "react-feather";

import { MovieInfo } from "@/components/movies/movieInfo";
import { Section } from "@/components/section";

import type { MovieResponse } from "@/services/movieService";

export type Movie = Awaited<ReturnType<typeof getMovie>>;

const getDirectorNames = async (directorIds: number[]) => {
  try {
    const directorNameResponses = await Promise.all(
      directorIds.map(directorId => fetch("/api/persons/" + directorId).then(response => response.json())),
    );

    const directorNames = directorNameResponses.map(response => response.name);

    return directorNames;
  } catch (error) {
    console.error("Error fetching director names:", error);
    return [];
  }
};

const getMovie = async (movieId: string) => {
  try {
    const res = await fetch("/api/movies/" + movieId);
    const movieData = (await res.json()) as MovieResponse;

    const { title, backdrop_path, overview, runtime, release_date, vote_average, crew } = movieData;

    const directors = crew.filter(member => member.job === "Director").map(director => director.personId);
    const directorNames = await getDirectorNames(directors);

    const movie = {
      title: title,
      backdropPath: backdrop_path,
      overview: overview,
      runtime: runtime,
      releaseYear: release_date ? new Date(release_date).getFullYear() : null,
      voteAverage: vote_average,
      directors: directorNames,
      // No age restriction data yet
      ageRestrictions: "?",
    };

    return movie;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<Movie>(null);

  useEffect(() => {
    async function fetchData() {
      const movieData = await getMovie(params.id);
      setMovie(movieData);
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

  if (!movie) {
    notFound();
  }

  return (
    <main style={{ padding: 0 }}>
      <MovieInfo movie={movie} />

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
