import Link from "next/link";
import { notFound } from "next/navigation";

import { getPersonById } from "@/services/personsService";
import { getMovieById } from "@/services/movieService";

import { Section } from "@/components/section";
import { MovieList, type MovieListItem } from "@/components/movieList";

type Person = NonNullable<Awaited<ReturnType<typeof getPersonById>>>;

const getBestRatedPersonMovies = async (person: Person) => {
  const movieCastIds = person.movieCast.map(cast => cast.movieId);
  const movieCrewIds = person.movieCrew.map(crew => crew.movieId);

  const uniqueIds = new Set([...movieCastIds, ...movieCrewIds]);

  const movies = await Promise.all(
    Array.from(uniqueIds).map(async movieId => {
      const movie = await getMovieById(movieId);

      if (movie) {
        return { poster_path: movie.poster_path, title: movie.title, id: movie.id, vote_average: movie.vote_average };
      }
    }),
  );

  const filteredMovies = movies
    .filter(movie => movie !== undefined)
    .sort((a, b) => {
      if (a === undefined || b === undefined) {
        return 0;
      }
      return b.vote_average - a.vote_average;
    });

  return filteredMovies.slice(0, 6) as MovieListItem[];
};

export default async function Person({ params }: { params: { id: string } }) {
  const person = await getPersonById(parseInt(params.id));

  if (!person) {
    notFound();
  }

  const movies = await getBestRatedPersonMovies(person);

  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { dateStyle: "long" });
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
            <span className="person-birthday">
              {person.birthday ? formatDate(person.birthday) : ""} -{" "}
              {person.deathday ? formatDate(person.deathday) : ""}
            </span>
            <h1>{person.name ? person.name : "No name"}</h1>
            <p className="person-description">{person.biography ? person.biography : "No biography"}</p>
          </div>
        </div>
        {person.homepage && (
          <div className="person-website">
            <Link href={person.homepage}>Homepage</Link>
          </div>
        )}
      </div>

      <div className="section-padding">
        <Section
          header={
            <div className="known-for-header">
              <h4>Known for...</h4> <Link href={"/persons/" + params.id + "/movies"}>See all</Link>
            </div>
          }
        >
          <MovieList movies={movies} />
        </Section>
      </div>
    </main>
  );
}
