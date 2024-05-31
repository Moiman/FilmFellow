"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import { Star } from "react-feather";
import { toast } from "react-toastify";
import { StarRating } from "@/app/movies/[id]/starRating";
import { Section } from "@/components/section";
import { createReview } from "@/services/reviewService";
import { getMovieById } from "@/services/movieService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@/components/errorMessage";

interface Props {
  movie: Movie;
}

type Movie = NonNullable<Awaited<ReturnType<typeof getMovieById>>>;

interface FormData {
  content: string;
}

const minLength = 10;
const maxLength = 5000;

const validationSchema = yup.object().shape({
  content: yup
    .string()
    .trim()
    .required("Review is required")
    .min(minLength, "Review must be at least " + minLength + " characters")
    .max(maxLength, "Review cannot exceed " + maxLength + " characters"),
});

export default function ReviewForm({ movie }: Props) {
  const router = useRouter();

  const [contentInput, setContentInput] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
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
                  className={contentInput.length <= maxLength ? "description grey" : "description pink"}
                >
                  {contentInput.length}/{maxLength}
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
