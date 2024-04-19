import Link from "next/link";
import { notFound } from "next/navigation";

import { getMovieById } from "@/services/movieService";
import { getPersonById } from "@/services/personsService";

import { Section } from "@/components/section";

type Person = Awaited<ReturnType<typeof getPerson>>;

const getPerson = async (personId: string) => {
  try {
    const personData = getPersonById(parseInt(personId));

    if (!personData) {
      return null;
    }

    return personData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

const getMovies = async (person: Person) => {
  const movieCastIds = person?.movieCast.map(cast => cast.movieId) || [];
  const movieCrewIds = person?.movieCrew.map(crew => crew.movieId) || [];

  const movieIds = movieCastIds.concat(movieCrewIds);
  const uniqueIds = movieIds.filter((id, index) => {
    return movieIds.indexOf(id) === index;
  });

  const movies = await Promise.all(
    uniqueIds.map(async movieId => {
      const movie = await getMovieById(movieId);
      return movie;
    }),
  );

  return movies;
};

export default async function Movies({ params }: { params: { id: string } }) {
  const person = await getPerson(params.id);
  const movies = await getMovies(person);

  if (!person) {
    notFound();
  }

  return (
    <main>
      <Section
        header={
          <div className="all-movies-header">
            Movies of <Link href={"/persons/" + params.id}>{person.name}</Link>
          </div>
        }
      >
        <div className="known-for-wrapper">
          {movies
            ? movies.map(movie =>
                movie ? (
                  <Link
                    key={movie.id}
                    href={"/movies/" + movie.id}
                  >
                    <div
                      className="known-for-item"
                      style={{
                        background: `URL(${movie.poster_path}) grey`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                      }}
                    >
                      {movie.title}
                    </div>
                  </Link>
                ) : null,
              )
            : null}
        </div>
      </Section>
    </main>
  );
}
