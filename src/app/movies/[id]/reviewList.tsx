"use client";
import { ReviewListItem } from "@/components/reviewListItem";
import { getReportsByCreatorId } from "@/services/reportService";

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
  userReports: UserReports;
}

export type UserReports = Awaited<ReturnType<typeof getReportsByCreatorId>>;

export const ReviewList = ({ importedReviews, reviews, userReports }: Props) => {
  return (
    <div className="review-grid">
      {reviews?.map(review => (
        <ReviewListItem
          userReports={userReports}
          key={review.id}
          review={review}
        />
      ))}
      {importedReviews?.map(importedReview => (
        <ReviewListItem
          userReports={userReports}
          key={importedReview.id}
          importedReview={importedReview}
        />
      ))}
    </div>
  );
};
