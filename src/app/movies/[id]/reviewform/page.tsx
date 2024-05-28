import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/authOptions";

import ReviewForm from "./form";
import { getMovieById } from "@/services/movieService";

export default async function ReviewPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const movie = await getMovieById(Number(params.id));
  if (!movie) {
    notFound();
  }

  if (!session) {
    redirect("/");
  } else {
    return <ReviewForm movie={movie} />;
  }
}
