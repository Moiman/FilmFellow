import Link from "next/link";
import { notFound } from "next/navigation";

import { getPersonById } from "@/services/personsService";

import { Section } from "@/components/section";
import { getPersonMovies } from "@/app/persons/[id]/page";

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
