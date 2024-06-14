import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { User } from "react-feather";

import { getPersonById } from "@/services/personsService";
import { getPopularPersonMovies } from "@/services/movieService";

import { Section } from "@/components/section";
import { MovieList } from "@/components/movieList";

export default async function Person({ params }: { params: { id: string } }) {
  const person = await getPersonById(parseInt(params.id));

  if (!person) {
    notFound();
  }

  const movies = await getPopularPersonMovies(person.id, 6);

  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { dateStyle: "long" });
  }

  return (
    <main style={{ padding: 0 }}>
      <div className="person-content">
        <div className="person-wrapper">
          <div className="image-wrapper">
            {person.profile_path ? (
              <Image
                alt={`${person.name}`}
                src={`https://image.tmdb.org/t/p/h632/${person.profile_path}`}
                fill={true}
                sizes="100%"
                priority={true}
              />
            ) : (
              <User />
            )}
            <div className="gradient" />
          </div>

          <div className="person-info">
            {(person.birthday || person.deathday) && (
              <span className="person-birthday">
                {person.birthday ? formatDate(person.birthday) : ""} -{" "}
                {person.deathday ? formatDate(person.deathday) : ""}
              </span>
            )}
            <h2 className="h1">{person.name ? person.name : "No name"}</h2>
            <p className="person-description">{person.biography ? person.biography : "No biography"}</p>
          </div>
        </div>
        {person.homepage && (
          <div className="person-website">
            <Link
              href={person.homepage}
              aria-label={`${person.name}'s homepage`}
            >
              Homepage
            </Link>
          </div>
        )}
      </div>

      <div className="section-padding">
        <Section
          header={
            <div className="known-for-header">
              <h4>Known for...</h4>
              <Link
                href={"/persons/" + params.id + "/movies"}
                aria-label={`See all ${person.name} movies`}
              >
                See all
              </Link>
            </div>
          }
        >
          <MovieList movies={movies} />
        </Section>
      </div>
    </main>
  );
}
