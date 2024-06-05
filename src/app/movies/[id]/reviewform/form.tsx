"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Star } from "react-feather";
import { toast } from "react-toastify";

import { StarRating } from "@/app/movies/[id]/starRating";
import { Section } from "@/components/section";
import { ErrorMessage } from "@/components/errorMessage";

import { createReview } from "@/services/reviewService";
import { getMovieById } from "@/services/movieService";
import { reviewMaxLength, reviewMinLength, reviewValidationSchema } from "@/schemas/reviewSchema";

interface Props {
  movie: Movie;
}

type Movie = NonNullable<Awaited<ReturnType<typeof getMovieById>>>;

interface FormData {
  content: string;
}
export default function ReviewForm({ movie }: Props) {
  const router = useRouter();

  const [contentInput, setContentInput] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(reviewValidationSchema),
  });

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

  const onSubmit = async (data: FormData) => {
    await createReview(Number(movie?.id), data.content.trim(), rating);
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
              onSubmit={handleSubmit(onSubmit)}
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
                required
                rows={10}
                placeholder="Share your thoughts! Was the storyline captivating? How was the acting? Did the special effects blow you away? Would you recommend it to a friend?"
                {...register("content")}
                onChange={e => setContentInput(e.target.value)}
              />
              {errors.content && <ErrorMessage message={errors.content.message} />}
            </form>
          </div>
        </Section>
      </div>
    </main>
  );
}
