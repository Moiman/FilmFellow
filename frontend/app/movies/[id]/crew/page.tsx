import Link from "next/link";

import { getMovieById } from "@/services/movieService";
import { notFound } from "next/navigation";
import { PersonList } from "../personList";
import { Section } from "@/components/section";

const getMovieCrew = async (movieId: string) => {
  try {
    const movieData = await getMovieById(parseInt(movieId), "US");

    if (!movieData) {
      return null;
    }

    const { title, crew } = movieData;

    return { title, crew };
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
        <PersonList
          persons={movie.crew.map(crewMember => {
            return {
              id: crewMember.personId,
              name: crewMember.name,
              profile_path: crewMember.profile_path,
              job: crewMember.job,
            };
          })}
        />
      </Section>
    </main>
  );
}
