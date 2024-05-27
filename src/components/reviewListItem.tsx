"use client";
import { useState } from "react";
import { Smile, Star, Trash2 } from "react-feather";
import Link from "next/link";
import { deleteReviewById } from "@/services/reviewService";
import { ReviewModal } from "./reviewModal";
import type { UserReports } from "@/app/movies/[id]/reviewList";

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
  review?: Review;
  importedReview?: ImportedReview;
  userReports?: UserReports;
  ownReview?: boolean;
}

export const ReviewListItem = ({ review, importedReview, userReports, ownReview }: Props) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openImportedReviewModal, setOpenImportedReviewModal] = useState(false);

  const checkIfReviewReported = () => {
    return userReports?.some(report => report.reviewId === review?.id) || false;
  };

  const checkIfImportedReviewReported = () => {
    return userReports?.some(report => report.importedReviewId === importedReview?.id) || false;
  };

  const handleDeleteReview = async () => {
    await deleteReviewById(Number(review?.id));
  };

  return review ? (
    <div className="review-grid-item">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          margin: "0 10px",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <Smile size={30} />

          <Link
            className="h5"
            href={"/users/" + review.user.id}
          >
            {review.user.username}
          </Link>
        </div>
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

      <p
        onClick={() => setOpenReviewModal(true)}
        className="review-grid-content description"
      >
        {review.content.length > 303 ? review.content.slice(0, 300) + "..." : review.content}
      </p>
      <ReviewModal
        reviewReported={checkIfReviewReported()}
        review={review}
        isModalOpen={openReviewModal}
        setIsModalOpen={setOpenReviewModal}
      />
      {ownReview && (
        <div className="review-grid-footer-primary">
          <button
            onClick={handleDeleteReview}
            className="button-transparent"
          >
            <Trash2
              color="black"
              style={{ marginLeft: "10px" }}
              size={20}
            />
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="review-grid-item">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "10px",
          margin: "0 10px",
        }}
      >
        <Smile
          size={30}
        />
        <p className="h5">{importedReview?.author}</p>
      </div>

      <p
        onClick={() => setOpenImportedReviewModal(true)}
        className="review-grid-content description"
      >
        {importedReview?.content.length! > 303
          ? importedReview?.content.slice(0, 300) + "..."
          : importedReview?.content}
      </p>
      <ReviewModal
        importedReviewReported={checkIfImportedReviewReported()}
        importedReview={importedReview}
        isModalOpen={openImportedReviewModal}
        setIsModalOpen={setOpenImportedReviewModal}
      />
      <div className="review-grid-footer-secondary">
        <p
          className="yellow"
          style={{ marginLeft: "10px" }}
        >
          Imported from TMDB
        </p>
      </div>
    </div>
  );
};
