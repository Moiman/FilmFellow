"use client";
import type { Movie } from "@/app/movies/[id]/page";
import { ReviewList } from "@/app/movies/[id]/reviewList";
import { StarRating } from "@/app/movies/[id]/starRating";
import { Section } from "@/components/section";
import { createReview } from "@/services/reviewService";
import Link from "next/link";
import { useState } from "react";
import { Flag } from "react-feather";
import { toast } from "react-toastify";

export default function ReviewForm({ movie }: { movie: Movie }) {
  const [contentInput, setContentInput] = useState("");
  const [rating, setRating] = useState<number | null>(movie.userRating);
  const reviewHeader = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 className="yellow-name-header">
        <Link href={`/movies/${movie.id}`}>{movie.title} </Link>
        Review
      </h2>
      <button type="submit">Send review</button>
    </div>
  );

  const handleReportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReview(Number(movie.id), contentInput, rating);
    setContentInput("");

    toast(<p>Review was submitted</p>, {
      icon: <Flag />,
      className: "yellow-toast",
    });
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
            onSubmit={handleReportSubmit}
            className="form"
          >
            <label htmlFor="content">Write your review here</label>
            <textarea
              id="content"
              required
              rows={10}
              value={contentInput}
              onChange={e => setContentInput(e.target.value)}
            />
            <button
              className="form-submit"
              type="submit"
            >
              Submit Report
            </button>
          </form>
          <ReviewList
            importedReviews={movie.reviewsData?.importedReviews}
            reviews={movie.reviewsData?.reviews}
            watchedRatings={movie.reviewsData?.watchedRatings}
          />
        </Section>
      </div>
    </main>
  );
}
