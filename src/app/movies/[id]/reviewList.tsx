"use client";
import { useState } from "react";
import { Flag, Star } from "react-feather";

interface User {
  id: number;
  username: string;
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

interface Props {
  importedReviews: ImportedReview[] | undefined;
  reviews: Review[] | undefined;
}

export const ReviewList = ({ importedReviews, reviews }: Props) => {
  const [reported, setReported] = useState(false);
  return (
    <div className="review-grid">
      {reviews?.map(review => (
        <div
          key={review.id}
          className="review-grid-item"
        >
          <div style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", gap: "10px" }}>
            <h2>{review.user.username}</h2>
            <div>
              {[1, 2, 3, 4, 5].map(starRating => (
                <Star
                  key={starRating}
                  stroke={review.rating && review.rating >= starRating ? "#ffc700" : "#eff2f2"}
                  fill={review.rating && review.rating >= starRating ? "#ffc700" : "#eff2f2"}
                  strokeWidth={2}
                  size={30}
                />
              ))}
            </div>
          </div>

          <p className="review-grid-content description">{review.content}</p>
          <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
            {!reported ? (
              <form action={`/report/review/${review.id}`}>
                <button
                  type="submit"
                  className="button-yellow button-icon-text"
                >
                  <Flag size={16} />
                  Report this review
                </button>
              </form>
            ) : (
              <button className="button-pink button-icon-text">
                <Flag size={16} />
                Reported!
              </button>
            )}
          </div>
        </div>
      ))}
      {importedReviews?.map(importedReview => (
        <div
          key={importedReview.id}
          className="review-grid-item"
        >
          <div style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", gap: "10px" }}>
            <h2>{importedReview.author}</h2>
          </div>

          <p className="review-grid-content description">{importedReview.content}</p>
          <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
            {!reported ? (
              <form action={`/report/review/${importedReview.id}`}>
                <button
                  type="submit"
                  className="button-yellow button-icon-text"
                >
                  <Flag size={16} />
                  Report this review
                </button>
              </form>
            ) : (
              <button className="button-pink button-icon-text">
                <Flag size={16} />
                Reported!
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
