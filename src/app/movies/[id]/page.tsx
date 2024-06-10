import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { Section } from "@/components/section";
import { MovieInfo } from "./movieInfo";
import { PersonList } from "./personList";
import { getMovie } from "./getMovie";
import { ReviewList } from "./reviewList";
import { MovieList } from "@/components/movieList";
import { getMovieRecommendations } from "@/recommender/getMovieRecommendations";

export default async function Movie({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const reviewsHeader = (
    <div className="header-default-style">
      <h3>Reviews</h3>
      <div style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", gap: "10px" }}>
        {session && (
          <form action={`/movies/${params.id}/reviewform`}>
            <button type="submit">Add review</button>
          </form>
        )}
        <Link href={`${params.id}/reviews`}>See all</Link>
      </div>
    </div>
  );

  const movie = await getMovie(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <main style={{ padding: 0 }}>
      <MovieInfo movie={movie} />

      <div className="section-padding">
        <Section
          header={
            <div className="header-default-style">
              <h3>Cast</h3> <Link href={`${params.id}/cast`}>See all</Link>
            </div>
          }
        >
          <PersonList persons={movie.cast.slice(0, 6)} />
        </Section>

        <Section
          header={
            <div className="header-default-style">
              <h3>Crew</h3> <Link href={`${params.id}/crew`}>See all</Link>
            </div>
          }
        >
          <PersonList persons={movie.crew.slice(0, 6)} />
        </Section>
        <Section header={reviewsHeader}>
          <ReviewList
            movieId={params.id}
            moviesCount={4}
          />
        </Section>

        <Section header="Similar movies">
          <MovieList movies={await getMovieRecommendations(movie.id, 6)} />
        </Section>
      </div>
    </main>
  );
}
