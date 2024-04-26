import Link from "next/link";
import { notFound } from "next/navigation";

import { getPersonById } from "@/services/personsService";
import { getMovieById } from "@/services/movieService";

import { Section } from "@/components/section";
import { MovieList } from "@/components/movieList";

type Person = NonNullable<Awaited<ReturnType<typeof getPersonById>>>;

const getAllPersonMovies = async (person: Person) => {
  const movieCastIds = person.movieCast.map(cast => cast.movieId);
  const movieCrewIds = person.movieCrew.map(crew => crew.movieId);

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

  const movies = await getAllPersonMovies(person);

  return (
    <main>
      <Section
        header={
          <div className="yellow-name-header">
            Movies of <Link href={"/persons/" + params.id}>{person.name}</Link>
          </div>
        }
      >
        <MovieList movies={movies} />
      </Section>
    </main>
  );
}
