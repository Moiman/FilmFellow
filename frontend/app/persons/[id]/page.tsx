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
      return movie;
    }),
  );

  return movies;
};

export default async function Person({ params }: { params: { id: string } }) {
  const person = await getPerson(params.id);
  const movies = await getMovies(person);

  if (!person) {
    notFound();
  }

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
              {person.birthday ? formatDate(person.birthday) : "Birthday"} -{" "}
              {person.deathday ? formatDate(person.deathday) : ""}
            </span>
            <h1>{person ? person.name : "Name"}</h1>
            <p className="person-description">{person.biography ? person.biography : "Biography"}</p>
          </div>
        </div>
        <div className="person-website">{person.homepage ? <Link href={person.homepage}>Homepage</Link> : null}</div>
      </div>

      <div className="section-padding">
        <Section
          header={
            <div className="known-for-header">
              <h4>Known for...</h4> <Link href={"/persons/" + params.id + "/movies"}>See all</Link>
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
      </div>
    </main>
  );
}
