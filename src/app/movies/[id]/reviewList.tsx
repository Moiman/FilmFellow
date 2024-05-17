"use client";
import { Star } from "react-feather";
import { ThumbsUp, ThumbsDown } from "react-feather";

interface User {
  id: number;
  username: string;
}

interface Review {
  id: number;
  movieId: number;
  content: string;
  user: User;
  // created_at: Date;
  // updated_at: Date;
  // userId: number;
}

interface ImportedReview {
  id: string;
  movieId: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  author: string;
}

interface WatchedRating {
  userId: number;
  movieId: number;
  rating: number | null;
}

interface Props {
  importedReviews: ImportedReview[] | undefined;
  reviews: Review[] | undefined;
  watchedRatings: WatchedRating[] | undefined;
}

export const ReviewList = ({ importedReviews, reviews, watchedRatings }: Props) => {
  return (
    <div className="review-grid">
      {importedReviews?.map(review => (
        <div
          key={review.id}
          className="review-grid-item"
        >
          <div style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", gap: "10px" }}>
            <h2>{review.author}</h2>
            <div>
              {[1, 2, 3, 4, 5].map(starRating => (
                <Star
                  key={starRating}
                  stroke={3 >= starRating ? "#ffc700" : "#eff2f2"}
                  fill={3 >= starRating ? "#ffc700" : "#eff2f2"}
                  strokeWidth={2}
                  size={30}
                />
              ))}
            </div>
          </div>

          <p className="description review-grid-content">{review.content}</p>
          <div className="review-grid-footer">
            <p>Was this review helpful</p>{" "}
            <div>
              <ThumbsUp /> <ThumbsDown />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
