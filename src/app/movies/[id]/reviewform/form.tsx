"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "react-feather";
import { toast } from "react-toastify";

import { StarRating } from "@/app/movies/[id]/starRating";
import { Section } from "@/components/section";

import { createReview } from "@/services/reviewService";
import { getMovieById } from "@/services/movieService";
import { reviewMaxLength, reviewMinLength } from "@/schemas/reviewSchema";

interface Props {
  movie: Movie;
}

type Movie = NonNullable<Awaited<ReturnType<typeof getMovieById>>>;

export default function ReviewForm({ movie }: Props) {
  const router = useRouter();

  const [contentInput, setContentInput] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const reviewHeader = (
    <div className="header-default-style">
      <h2 className="yellow-name-header">
        <Link href={`/movies/${movie.id}`}>{movie.title}</Link> review
      </h2>
      <button
        type="submit"
        form="review-form"
      >
        Send review
      </button>
    </div>
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createReview(Number(movie?.id), contentInput.trim(), rating);

    setContentInput("");
    setRating(null);

    toast(<p>Your review was submitted</p>, {
      icon: <Star className="yellow-icon-filled" />,
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
          <div style={{ display: "grid", gap: "15px" }}>
            <StarRating
              rating={rating}
              setRating={setUserRating}
              size={40}
            />
            <form
              onSubmit={e => onSubmit(e)}
              id="review-form"
              className="form"
              style={{ padding: "0" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label
                  htmlFor="content"
                  className="h6"
                >
                  Write your review here
                </label>
                <p
                  style={{ marginBottom: "0" }}
                  className={
                    contentInput.length <= reviewMaxLength && contentInput.length >= reviewMinLength
                      ? "description grey"
                      : "description pink"
                  }
                >
                  {contentInput.length}/{reviewMaxLength}
                </p>
              </div>
              <textarea
                id="content"
                name="content"
                required
                rows={10}
                minLength={reviewMinLength}
                maxLength={reviewMaxLength}
                placeholder="Share your thoughts! Was the storyline captivating? How was the acting? Did the special effects blow you away? Would you recommend it to a friend?"
                onChange={e => setContentInput(e.target.value)}
              />
            </form>
          </div>
        </Section>
      </div>
    </main>
  );
}
