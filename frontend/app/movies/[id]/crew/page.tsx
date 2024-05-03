import { getMovieById } from "@/services/movieService";
import { notFound } from "next/navigation";
import { PersonList } from "../personList";
import { Section } from "@/components/section";

export const getMovie = async (movieId: string) => {
  try {
    const movieData = await getMovieById(parseInt(movieId), "US");

    if (!movieData) {
      return null;
    }

    const { crew } = movieData;

    return crew;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export default async function Movie({ params }: { params: { id: string } }) {
  const movieCrew = await getMovie(params.id);
  console.log(movieCrew);

  if (!movieCrew) {
    notFound();
  }

  return (
    <main>
      <Section header="Crew">
        <PersonList
          persons={movieCrew.map(crewMember => {
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
