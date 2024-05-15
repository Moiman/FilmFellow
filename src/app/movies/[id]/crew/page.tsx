import Link from "next/link";
import { notFound } from "next/navigation";

import { getMovieCrewById } from "@/services/movieService";
import { Section } from "@/components/section";
import { PersonList } from "../personList";

export default async function MovieCrew({ params }: { params: { id: string } }) {
  const movie = await getMovieCrewById(parseInt(params.id));

  !movie.title && notFound();

  return (
    <main>
      <Section
        header={
          <h2 className="yellow-name-header">
            Crew of <Link href={`/movies/${params.id}`}>{movie.title}</Link>
          </h2>
        }
      >
        <PersonList persons={movie.crew} />
      </Section>
    </main>
  );
}
