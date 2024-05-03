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

    const { cast } = movieData;

    return cast;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export default async function Movie({ params }: { params: { id: string } }) {
  const movieCast = await getMovie(params.id);
  console.log(movieCast);

  if (!movieCast) {
    notFound();
  }

  return (
    <main>
      <Section header="Crew">
        <PersonList
          persons={movieCast.map(castMember => {
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
