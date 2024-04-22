import { notFound } from "next/navigation";

import { MovieInfo } from "@/components/movies/movieInfo";
import { Section } from "@/components/section";
import { getMovieById } from "@/services/movieService";

export type Movie = NonNullable<Awaited<ReturnType<typeof getMovie>>>;

const getMovie = async (movieId: string) => {
  try {
    const movieData = await getMovieById(parseInt(movieId), "US");

    if (!movieData) {
      return null;
    }

    const { title, backdrop_path, overview, runtime, release_date, vote_average, directors, rating } = movieData;

    const movie = {
      title,
      backdropPath: backdrop_path,
      overview,
      runtime,
      releaseYear: release_date ? new Date(release_date).getFullYear() : null,
      voteAverage: vote_average,
      directors,
      // No age restriction data yet
      ageRestrictions: rating ? rating : "?",
    };

    return movie;
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
    <main style={{ padding: 0 }}>
      <MovieInfo movie={movie} />

      <div className="section-padding">
        <Section header="Cast">
          <p>Coming soon</p>
        </Section>

        <Section header="Crew">
          <p>Coming soon</p>
        </Section>

        <Section header="Reviews">
          <p>Coming soon</p>
        </Section>

        <Section header="In theaters">
          <p>Coming soon</p>
        </Section>

        <Section header="Similar movies">
          <p>Coming soon</p>
        </Section>
      </div>
    </main>
  );
}
