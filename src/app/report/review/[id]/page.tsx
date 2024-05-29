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
  if (!session) {
    redirect("/");
  } else {
    return <ReportReviewForm targetReview={review} />;
  }
}
