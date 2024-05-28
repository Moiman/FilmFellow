"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Star } from "react-feather";
import { toast } from "react-toastify";
import { StarRating } from "@/app/movies/[id]/starRating";
import { Section } from "@/components/section";
import { createReview } from "@/services/reviewService";
import { getMovieById } from "@/services/movieService";

interface Props {
  movie: Movie;
}

type Movie = NonNullable<Awaited<ReturnType<typeof getMovieById>>>;

export default function ReviewForm({ movie }: Props) {
  const router = useRouter();
  const [contentInput, setContentInput] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const reviewHeader = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 className="yellow-name-header">
        <Link href={`/movies/${movie.id}`}>{movie.title} </Link>
        Review
      </h2>
      <button
        type="submit"
        form="review-form"
      >
        Send review
      </button>
    </div>
  );

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReview(Number(movie?.id), contentInput.trim(), rating);
    setContentInput("");

    toast(<p>Review was submitted</p>, {
      icon: <Star />,
      className: "yellow-toast",
    });
    router.push("/movies/" + movie?.id);
  };

  const setUserRating = async (stars: number | null) => {
    const newRating = stars === rating ? null : stars;
    setRating(newRating);
  };
  return (
    <main className="form-main">
      <div className="section-wrapper">
        <Section header={reviewHeader}>
          <StarRating
            rating={rating}
            setRating={setUserRating}
          />
          <form
            onSubmit={handleReviewSubmit}
            id="review-form"
            className="form"
            style={{ padding: "0" }}
          >
            <label htmlFor="content">Write your review here</label>
            <textarea
              id="content"
              required
              rows={10}
              value={contentInput}
              onChange={e => setContentInput(e.target.value)}
            />
          </form>
        </Section>
      </div>
    </main>
  );
}
