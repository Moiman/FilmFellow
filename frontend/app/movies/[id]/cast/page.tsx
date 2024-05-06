import Link from "next/link";
import { notFound } from "next/navigation";

import { getMovieById } from "@/services/movieService";
import { Section } from "@/components/section";
import { PersonList } from "../personList";

const getMovieCast = async (movieId: string) => {
  try {
    const movieData = await getMovieById(parseInt(movieId), "US");

    if (!movieData) {
      return null;
    }

    const { title, cast } = movieData;
    return { title, cast };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export default async function Movie({ params }: { params: { id: string } }) {
  const movie = await getMovieCast(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <main>
      <Section
        header={
          <h2 className="yellow-name-header">
            Cast of <Link href={`/movies/${params.id}`}>{movie.title}</Link>
          </h2>
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
    </main>
  );
}
