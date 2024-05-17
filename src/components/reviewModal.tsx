"use client";
import { useState } from "react";
import Modal from "./modal";
import { Flag, Star } from "react-feather";
// import { Review } from "@/app/report/review/[id]/form";

interface Props {
  review?: Review;
  importedReview?: ImportedReview;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Review {
    id: number;
  movieId: number;
  content: string;
  user: User;
  rating: number | null;
}

interface ImportedReview {
  id: string;
  movieId: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  author: string;
}

interface User {
  id: number;
  username: string;
}

export const ReviewModal = ({ review, importedReview, isModalOpen, setIsModalOpen }: Props) => {

  const content = () => {
    if (review) {
      return (
        <div className="review-grid-item">
          <div style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", gap: "10px" }}>
            <h2>
              {review?.user.username}
            </h2>
            <div>
              {[1, 2, 3, 4, 5].map(starRating => (
                <Star
                  key={starRating}
                  stroke={review?.rating && review.rating >= starRating ? "#ffc700" : "#eff2f2"}
                  fill={review?.rating && review.rating >= starRating ? "#ffc700" : "#eff2f2"}
                  strokeWidth={2}
                  size={30}
                />
              ))}
            </div>
            <p>{review.content}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
            <form action={`/report/review/${review?.id}`}>
              <button
                type="submit"
                className="button-yellow button-icon-text"
              >
                <Flag size={16} />
                Report this review
              </button>
            </form>

            <button className="button-pink button-icon-text">
              <Flag size={16} />
              Reported!
            </button>
          </div>
        </div>
      );
    } else if (importedReview) {
      return (
        <div className="review-grid-item">
          <div style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", gap: "10px" }}>
            <h2>{importedReview?.author}</h2>
          </div>
          <p>{importedReview?.content}</p>
          <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
            <form action={`/report/review/${importedReview?.id}`}>
              <button
                type="submit"
                className="button-yellow button-icon-text"
              >
                <Flag size={16} />
                Report this review
              </button>
            </form>

            <button className="button-pink button-icon-text">
              <Flag size={16} />
              Reported!
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <Modal
      isOpen={isModalOpen}
      closeModal={() => setIsModalOpen(false)}
      content={content()}
    />
  );
};
