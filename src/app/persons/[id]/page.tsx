import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getPersonById } from "@/services/personsService";
import { getMovieById } from "@/services/movieService";

import { Section } from "@/components/section";
import { MovieList } from "@/components/movieList";

type Person = NonNullable<Awaited<ReturnType<typeof getPersonById>>>;

const getBestRatedPersonMovies = async (person: Person) => {
  const movieCastIds = person.movieCast.map(cast => cast.movieId);
  const movieCrewIds = person.movieCrew.map(crew => crew.movieId);

  const uniqueIds = new Set([...movieCastIds, ...movieCrewIds]);

  const movies = await Promise.all(
    Array.from(uniqueIds).map(async movieId => {
      const movie = await getMovieById(movieId);

      if (!movie) {
        return null;
      }

      return { poster_path: movie.poster_path, title: movie.title, id: movie.id, vote_average: movie.vote_average };
    }),
  );

  const filteredMovies = movies
    .filter(movie => movie !== null)
    .sort((a, b) => (b?.vote_average ?? 0) - (a?.vote_average ?? 0)) as NonNullable<(typeof movies)[0]>[];

  return filteredMovies.slice(0, 6);
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
          <div className="image-wrapper">
            {person.profile_path && (
              <Image
                alt={`${person.name}`}
                src={`https://image.tmdb.org/t/p/h632/${person.profile_path}`}
                fill={true}
                sizes="100%"
                priority={true}
              />
            )}
            <div className="gradient" />
          </div>

          <div className="person-info">
            {(person.birthday || person.deathday) && (
              <span className="person-birthday">
                {person.birthday ? formatDate(person.birthday) : ""} -{" "}
                {person.deathday ? formatDate(person.deathday) : ""}
              </span>
            )}
            <h2 className="h1">{person.name ? person.name : "No name"}</h2>
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
