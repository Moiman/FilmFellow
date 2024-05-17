import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/authOptions";
import ReportReviewForm from "./form";
import { getReviewById } from "@/services/reviewService";

interface Params {
  id: string;
}

export default async function ReportReviewPage({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  const targetReviewId = parseInt(params.id);
  let review = await getReviewById(targetReviewId);
  if(!review){
    review = await getReviewById(params.id);
  }
  if(!review){
    notFound();
  }
  if (!session) {
    redirect("/");
  } else {
    return <ReportReviewForm targetReview={review} />;
  }
}
