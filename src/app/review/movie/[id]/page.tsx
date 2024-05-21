import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/authOptions";

import ReviewForm from "./form";
import { getMovie } from "@/app/movies/[id]/page";
import { getReportsByCreatorId } from "@/services/reportService";
import { UserReports } from "@/app/movies/[id]/reviewList";

interface Params {
  id: string;
}

export default async function ReviewPage({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  let userReports: UserReports = [];
  const movie = await getMovie(params.id);
  if (!movie) {
    notFound();
  }
  if (session) {
    userReports = await getReportsByCreatorId();
  }
  if (!session) {
    redirect("/");
  } else {
    return (
      <ReviewForm
        movie={movie}
        userReports={userReports}
      />
    );
  }
}
