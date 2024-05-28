"use client";
import { useState } from "react";
import { Smile, Star, Trash2 } from "react-feather";
import Link from "next/link";
import { deleteReviewById, getAllReviewsForMovie } from "@/services/reviewService";
import { ReviewModal } from "./reviewModal";

interface Props {
  review?: Reviews["reviews"][0];
  importedReview?: Reviews["importedReviews"][0];
  ownReview?: boolean;
}

type Reviews = Awaited<ReturnType<typeof getAllReviewsForMovie>>;

export const ReviewListItem = ({ review, importedReview, ownReview }: Props) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openImportedReviewModal, setOpenImportedReviewModal] = useState(false);

  const checkIfReviewReported = () => {
    if (review) {
      return review.reports.length > 0;
    } else {
      return false;
    }
  };

  const checkIfImportedReviewReported = () => {
    if (importedReview) {
      return importedReview.reports.length > 0;
    } else {
      return false;
    }
  };

  const handleDeleteReview = async () => {
    await deleteReviewById(Number(review?.id));
  };

  return review ? (
    <div className="review-grid-item">
      <div className="review-header-item">
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
              size={20}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setOpenReviewModal(true)}
        className="review-grid-content description button-review"
      >
        <p>{review.content.length > 303 ? review.content.slice(0, 300) + "..." : review.content}</p>
      </button>
      <ReviewModal
        reviewReported={checkIfReviewReported()}
        review={review}
        isModalOpen={openReviewModal}
        setIsModalOpen={setOpenReviewModal}
      />
      {ownReview && (
        <div className="review-grid-footer review-grid-footer-yellow">
          <button
            onClick={handleDeleteReview}
            className="button-transparent"
          >
            <Trash2
              color="black"
              size={20}
            />
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="review-grid-item">
      <div className="review-header-item-secondary">
        <Smile size={30} />
        <p
          className="h5"
          style={{ lineHeight: "2rem" }}
        >
          {importedReview?.author}
        </p>
      </div>

      <button
        onClick={() => setOpenImportedReviewModal(true)}
        className="review-grid-content description button-review"
      >
        <p>
          {importedReview?.content.length! > 303
            ? importedReview?.content.slice(0, 300) + "..."
            : importedReview?.content}
        </p>
      </button>
      <ReviewModal
        importedReviewReported={checkIfImportedReviewReported()}
        importedReview={importedReview}
        isModalOpen={openImportedReviewModal}
        setIsModalOpen={setOpenImportedReviewModal}
      />
      <div className="review-grid-footer review-grid-footer-dark">
        <p className="yellow">Imported from TMDB</p>
      </div>
    </div>
  );
};
