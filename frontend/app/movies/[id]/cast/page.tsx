import Link from "next/link";
import { notFound } from "next/navigation";

import { getMovieById } from "@/services/movieService";
import { PersonList } from "../personList";
import { Section } from "@/components/section";

export const getMovie = async (movieId: string) => {
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
  const movie = await getMovie(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <main>
      <Section
        header={
          <div className="yellow-name-header">
            <Link href={`/movies/${params.id}`}>{movie.title}</Link> Cast
          </div>
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