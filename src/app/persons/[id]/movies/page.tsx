import Link from "next/link";
import { notFound } from "next/navigation";

import { getPersonById } from "@/services/personsService";
import { getMovieById, getBestRatedPersonMovies } from "@/services/movieService";

import { Section } from "@/components/section";
import { MovieList } from "@/components/movieList";

export default async function PersonMovies({ params }: { params: { id: string } }) {
  const person = await getPersonById(parseInt(params.id));

  if (!person) {
    notFound();
  }

  const movies = await getBestRatedPersonMovies(person.id);

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
