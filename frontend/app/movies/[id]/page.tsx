"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "react-feather";

import { MovieInfo } from "@/components/movies/movieInfo";
import { Section } from "@/components/section";

export type Movie = {
  title: string;
  posterPath: string;
  overview: string;
  runtime: number;
  releaseYear: number;
  voteAverage: number;
  directors: string[];
  ageRestrictions: string;
};

type CrewMember = {
  credit_id: string;
  movieId: number;
  personId: number;
  department: string;
  job: string;
};

export default function Movie({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movieData = await fetch("/api/movies/" + params.id).then(response => response.json());

        if (!movieData.error) {
          const { title, poster_path, overview, runtime, release_date, vote_average, crew } = movieData;

          const directors = crew
            .filter((member: CrewMember) => member.department === "Directing")
            .map((director: CrewMember) => director.personId);

          const directorNames = await getDirectorNames(directors);

          const movie: Movie = {
            title: title,
            posterPath: poster_path,
            overview: overview,
            runtime: runtime,
            releaseYear: new Date(release_date).getFullYear(),
            voteAverage: vote_average,
            directors: directorNames,
            ageRestrictions: "?",
          };

          setMovie(movie);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    getMovie(); // Call the getMovie function
  }, [params.id]); // Dependency array with params.id

  const getDirectorNames = async (directorIds: number[]) => {
    try {
      const directorNameResponses = await Promise.all(
        directorIds.map(directorId => fetch("/api/persons/" + directorId).then(response => response.json())),
      );

      // Extracting director names from responses
      const directorNames = directorNameResponses.map(response => response.name);

      return directorNames;
    } catch (error) {
      console.error("Error fetching director names:", error);
      return [];
    }
  };

  if (isLoading) {
    return (
      <main className="rotating-star">
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
