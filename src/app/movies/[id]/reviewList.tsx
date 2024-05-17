"use client";
import { ReviewListItem } from "@/components/reviewListItem";

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
  return (
    <div className="review-grid">
      {reviews?.map(review => (
        <ReviewListItem
          key={review.id}
          review={review}
        />
      ))}
      {importedReviews?.map(importedReview => (
        <ReviewListItem
          key={importedReview.id}
          importedReview={importedReview}
        />
      ))}
    </div>
  );
};
