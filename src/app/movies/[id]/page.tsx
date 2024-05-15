import { notFound } from "next/navigation";
import Link from "next/link";

import { getMovieById } from "@/services/movieService";
import { getIsWatched, getMovieRating } from "@/services/watchedService";
import { getIsFavorite } from "@/services/favoriteService";

import { Section } from "@/components/section";
import { MovieInfo } from "./movieInfo";
import { PersonList } from "./personList";

export type Movie = NonNullable<Awaited<ReturnType<typeof getMovie>>>;

const getMovie = async (movieId: string) => {
  try {
    const movieData = await getMovieById(parseInt(movieId), "US");
    const userRating = await getMovieRating(Number(movieId));
    const isWatched = await getIsWatched(Number(movieId));
    const isFavorite = await getIsFavorite(Number(movieId));

    if (!movieData) {
      return null;
    }

    const { id, title, backdrop_path, overview, runtime, release_date, vote_average, directors, rating, cast, crew } =
      movieData;

    const movieCast = cast.map(castMember => ({
      id: castMember.personId,
      name: castMember.name,
      profilePath: castMember.profile_path,
      character: castMember.character,
    }));

    const movieCrew = crew.map(crewMember => ({
      id: crewMember.personId,
      name: crewMember.name,
      profilePath: crewMember.profile_path,
      job: crewMember.job,
    }));

    const movie = {
      id,
      title,
      backdropPath: backdrop_path,
      overview,
      runtime,
      releaseYear: release_date ? new Date(release_date).getFullYear() : null,
      voteAverage: vote_average,
      directors,
      ageRestrictions: rating ? rating : "?",
      isFavorite,
      isWatched,
      userRating,
      crew: movieCrew,
      cast: movieCast,
    };

    return movie;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export default async function Movie({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);
  if (!movie) {
    notFound();
  }

  return (
    <main style={{ padding: 0 }}>
      <MovieInfo movie={movie} />

      <div className="section-padding">
        <Section
          header={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>Cast</h3> <Link href={`${params.id}/cast`}>See all</Link>
            </div>
          }
        >
          <PersonList persons={movie.cast.slice(0, 6)} />
        </Section>

        <Section
          header={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>Crew</h3> <Link href={`${params.id}/crew`}>See all</Link>
            </div>
          }
        >
          <PersonList persons={movie.crew.slice(0, 6)} />
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