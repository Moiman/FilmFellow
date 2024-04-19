import Link from "next/link";
import { notFound } from "next/navigation";

import { getPersonById } from "@/services/personsService";
import { getMovieById } from "@/services/movieService";

import { Section } from "@/components/section";

type Person = NonNullable<Awaited<ReturnType<typeof getPersonById>>>;

const getPersonMovies = async (person: Person) => {
  const movieCastIds = person.movieCast.map(cast => cast.movieId) || [];
  const movieCrewIds = person.movieCrew.map(crew => crew.movieId) || [];

  const uniqueIds = new Set([...movieCastIds, ...movieCrewIds]);

  const movies = await Promise.all(
    Array.from(uniqueIds).map(async movieId => {
      const movie = await getMovieById(movieId);

      if (!movie) {
        return null;
      }

      return { poster_path: movie.poster_path, title: movie.title, id: movie.id };
    }),
  );

  return movies;
};

export default async function PersonMovies({ params }: { params: { id: string } }) {
  const person = await getPersonById(parseInt(params.id));

  if (!person) {
    notFound();
  }

  const movies = await getPersonMovies(person);

  return (
    <main>
      <Section
        header={
          <div className="all-movies-header">
            Movies of <Link href={"/persons/" + params.id}>{person.name}</Link>
          </div>
        }
      >
        <div className="known-for-movies">
          {movies
            ? movies.map(movie =>
                movie ? (
                  <Link
                    key={movie.id}
                    href={"/movies/" + movie.id}
                  >
                    {/* Remove this when we get working poster paths */}
                    <div className="placeholder-movie-poster">{movie.title}</div>

                    {/* Working image for when we have poster paths:
                    <Image
                      src={`${movie.poster_path}`}
                      width={150}
                      height={225}
                      alt={movie.title}
                      layout="responsive"
                    />
                */}
                  </Link>
                ) : null,
              )
            : null}
        </div>
      </Section>
    </main>
  );
}
