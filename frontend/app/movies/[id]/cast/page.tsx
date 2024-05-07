import Link from "next/link";
import { notFound } from "next/navigation";

import { getMovieCastById } from "@/services/movieService";
import { Section } from "@/components/section";
import { PersonList } from "../personList";

export default async function MovieCast({ params }: { params: { id: string } }) {
  const movie = await getMovieCastById(parseInt(params.id));

  !movie.title && notFound();

  return (
    <main>
      <Section
        header={
          <h2 className="yellow-name-header">
            Cast of <Link href={`/movies/${params.id}`}>{movie.title}</Link>
          </h2>
        }
      >
        <PersonList persons={movie.cast} />
      </Section>
    </main>
  );
}
