import Link from "next/link";
import { notFound } from "next/navigation";

import { getPersonById } from "@/services/personsService";
import { getMovieById } from "@/services/movieService";

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

      if (!movie) {
        return null;
      }

      return { poster_path: movie.poster_path, title: movie.title, id: movie.id };
    }),
  );

  return movies;
};

export default async function PersonMovies({ params }: { params: { id: string } }) {
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
