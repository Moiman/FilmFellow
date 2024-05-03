import { notFound } from "next/navigation";

import { getMovieById } from "@/services/movieService";
import { Section } from "@/components/section";
import { MovieInfo } from "./movieInfo";
import { PersonList } from "./personList";
import { Fleur_De_Leah } from "next/font/google";
import Link from "next/link";

export type Movie = NonNullable<Awaited<ReturnType<typeof getMovie>>>;

const getMovie = async (movieId: string) => {
  try {
    const movieData = await getMovieById(parseInt(movieId), "US");

    if (!movieData) {
      return null;
    }

    const { id, title, backdrop_path, overview, runtime, release_date, vote_average, directors, rating, crew, cast } =
      movieData;

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
      crew,
      cast,
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
              <h3>Cast</h3> <Link href="cast">See all</Link>
            </div>
          }
        >
          <PersonList
            persons={movie.cast.map(castMember => {
              return {
                id: castMember.personId,
                name: castMember.name,
                profile_path: castMember.profile_path,
                character: castMember.character,
              };
            })}
          />
        </Section>

        <Section
          header={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>Crew</h3> <Link href="cast">See all</Link>
            </div>
          }
        >
          <PersonList
            persons={movie.crew.map(crewMember => {
              return {
                id: crewMember.personId,
                name: crewMember.name,
                profile_path: crewMember.profile_path,
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
