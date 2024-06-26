"use client";
import { Flag, Smile, Star } from "react-feather";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Modal from "./modal";

interface Props {
  review?: Review;
  importedReview?: ImportedReview;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reviewReported?: boolean;
  importedReviewReported?: boolean;
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

export const ReviewModal = ({
  review,
  importedReview,
  isModalOpen,
  setIsModalOpen,
  reviewReported,
  importedReviewReported,
}: Props) => {
  const { data: session } = useSession();
  const content = () => {
    if (review) {
      return (
        <div className="review-grid-modal-item">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <Smile
                size={30}
                className="user-icon"
              />
              <Link
                className="h5"
                href={"/users/" + review.user.id}
              >
                {review.user.username}
              </Link>
            </div>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(starRating => (
                <Star
                  key={starRating}
                  className={review.rating && review.rating >= starRating ? "selected" : "not-selected"}
                  strokeWidth={2}
                  size={20}
                />
              ))}
            </div>
          </div>
          <p className="review-modal-content description">{review.content}</p>

          {session && session.user.id !== review.user.id && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {!reviewReported ? (
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
                <button
                  className="button-pink button-icon-text"
                  disabled
                >
                  <Flag size={16} />
                  Reported!
                </button>
              )}
            </div>
          )}
        </div>
      );
    } else if (importedReview) {
      return (
        <div className="review-grid-modal-item">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Smile
              size={30}
              className="user-icon"
            />
            <p className="h5">{importedReview?.author}</p>
          </div>
          <p className="review-modal-content description">{importedReview?.content}</p>
          {session && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {!importedReviewReported ? (
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
                <button
                  className="button-pink button-icon-text"
                  aria-label="Review reported"
                  disabled={true}
                >
                  <Flag size={16} />
                  Reported
                </button>
              )}
            </div>
          )}
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
