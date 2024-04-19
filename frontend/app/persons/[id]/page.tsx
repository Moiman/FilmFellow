import Link from "next/link";
import { notFound } from "next/navigation";

import { getPersonById } from "@/services/personsService";
import { getMovieById } from "@/services/movieService";

import { Section } from "@/components/section";

type Person = NonNullable<Awaited<ReturnType<typeof getPersonById>>>;

export const getPersonMovies = async (person: Person) => {
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

export default async function Person({ params }: { params: { id: string } }) {
  const person = await getPersonById(parseInt(params.id));

  if (!person) {
    notFound();
  }

  const movies = await getPersonMovies(person);

  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  return (
    <main style={{ padding: 0 }}>
      <div className="person-content">
        <div className="person-wrapper">
          <div
            className="img"
            style={{
              background: `URL(${person.profile_path}) grey`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          >
            <div className="gradient" />
          </div>

          <div className="person-info">
            <span className="person-birthday">
              {person.birthday ? formatDate(person.birthday) : ""} -{" "}
              {person.deathday ? formatDate(person.deathday) : ""}
            </span>
            <h1>{person.name ? person.name : "No name"}</h1>
            <p className="person-description">{person.biography ? person.biography : "No biography"}</p>
          </div>
        </div>
        {person.homepage && (
          <div className="person-website">
            <Link href={person.homepage}>Homepage</Link>
          </div>
        )}
      </div>

      <div className="section-padding">
        <Section
          header={
            <div className="known-for-header">
              <h4>Known for...</h4> <Link href={"/persons/" + params.id + "/movies"}>See all</Link>
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
      </div>
    </main>
  );
}
