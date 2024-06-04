import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/authOptions";
import ReportReviewForm from "./form";
import { getReviewById } from "@/services/reviewService";

export default async function ReportReviewPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const review = await getReviewById(params.id);

  if (!review) {
    notFound();
  }
  const isReported = review.reports.filter(report => report.creatorId === session?.user.id);

  if (!session || isReported.length > 0) {
    redirect(`/movies/${review.movieId}`);
  } else {
    return <ReportReviewForm targetReview={review} />;
  }
}
