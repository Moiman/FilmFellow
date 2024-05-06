import { notFound } from "next/navigation";
import Link from "next/link";

import { getMovieById, getMovieCastById, getMovieCrewById } from "@/services/movieService";
import { getIsWatched, getMovieRating } from "@/services/watchedService";
import { getIsFavorite } from "@/services/favoriteService";

import { Section } from "@/components/section";
import { MovieInfo } from "./movieInfo";
import { PersonList } from "./personList";

export type Movie = NonNullable<Awaited<ReturnType<typeof getMovie>>>;

const getMovie = async (movieId: string) => {
  try {
    const movieData = await getMovieById(parseInt(movieId), "US");
    const movieCrew = await getMovieCrewById(parseInt(movieId));
    const movieCast = await getMovieCastById(parseInt(movieId));
    const userRating = await getMovieRating(Number(movieId));
    const isWatched = await getIsWatched(Number(movieId));
    const isFavorite = await getIsFavorite(Number(movieId));

    if (!movieData) {
      return null;
    }

    const { id, title, backdrop_path, overview, runtime, release_date, vote_average, directors, rating } = movieData;

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
      crew: movieCrew.crew,
      cast: movieCast.cast,
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
          <PersonList
            amount={6}
            persons={movie.cast.map(castMember => {
              return {
                id: castMember.person.id,
                name: castMember.person.name,
                profile_path: castMember.person.profile_path,
                character: castMember.character,
              };
            })}
          />
        </Section>

        <Section
          header={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>Crew</h3> <Link href={`${params.id}/crew`}>See all</Link>
            </div>
          }
        >
          <PersonList
            amount={6}
            persons={movie.crew.map(crewMember => {
              return {
                id: crewMember.person.id,
                name: crewMember.person.name,
                profile_path: crewMember.person.profile_path,
                job: crewMember.job,
              };
            })}
          />
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
