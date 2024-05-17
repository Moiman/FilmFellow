import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovieCrewById } from "@/services/movieService";
import { Section } from "@/components/section";
import { ReviewList } from "../reviewList";
import { getImportedReviewsAndLocalReviewsById } from "@/services/reviewService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

export default async function MovieReviews({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const reviewData = await getImportedReviewsAndLocalReviewsById(parseInt(params.id));
  const movie = await getMovieCrewById(parseInt(params.id));

  !movie.title && notFound();

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
        <ReviewList
          importedReviews={reviewData?.importedReviews}
          reviews={reviewData?.reviews}
        />
      </Section>
    </main>
  );
}
