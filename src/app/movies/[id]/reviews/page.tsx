import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { getMovieCrewById } from "@/services/movieService";
import { Section } from "@/components/section";
import { ReviewList, UserReports } from "../reviewList";
import { getImportedReviewsAndLocalReviewsById } from "@/services/reviewService";
import { authOptions } from "@/authOptions";
import { getReportsByCreatorId } from "@/services/reportService";

export default async function MovieReviews({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const reviewData = await getImportedReviewsAndLocalReviewsById(parseInt(params.id));
  const movie = await getMovieCrewById(parseInt(params.id));

  !movie.title && notFound();
  let userReports: UserReports = [];
  if (session) {
    userReports = await getReportsByCreatorId();
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
        <ReviewList
          userReports={userReports}
          importedReviews={reviewData?.importedReviews}
          reviews={reviewData?.reviews}
        />
      </Section>
    </main>
  );
}
