import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { getMovieCrewById } from "@/services/movieService";
import { Section } from "@/components/section";
import { ReviewList } from "../reviewList";
import { authOptions } from "@/authOptions";

export default async function MovieReviews({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const movie = await getMovieCrewById(parseInt(params.id));
  if (!movie.title) {
    notFound();
  }

  return (
    <main>
      <Section
        header={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 className="yellow-name-header">
              <Link href={`/movies/${params.id}`}>{movie.title} </Link>
              Reviews
            </h2>
            {session && (
              <form action={`/review/movie/${params.id}`}>
                <button type="submit">Add review</button>
              </form>
            )}
          </div>
        }
      >
        <ReviewList movieId={params.id} />
      </Section>
    </main>
  );
}
