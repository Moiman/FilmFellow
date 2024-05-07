import Link from "next/link";
import { notFound } from "next/navigation";

import { getMovieCrewById } from "@/services/movieService";
import { Section } from "@/components/section";
import { PersonList } from "../personList";

const getMovieCrew = async (movieId: string) => {
  try {
    const movieData = await getMovieCrewById(parseInt(movieId));

    if (!movieData) {
      return null;
    }

    return movieData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export default async function Movie({ params }: { params: { id: string } }) {
  const movie = await getMovieCrew(params.id);

  if (!movie) {
    notFound();
  }

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
