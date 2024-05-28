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
              display: "grid",
              gridTemplateColumns: "auto auto",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              padding: "15px",
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
                  stroke={review?.rating && review.rating >= starRating ? "#ffc700" : "#eff2f2"}
                  fill={review?.rating && review.rating >= starRating ? "#ffc700" : "#eff2f2"}
                  strokeWidth={2}
                  size={30}
                />
              ))}
            </div>
          </div>
          <p className="review-grid-content description">{review.content}</p>

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
                <button className="button-pink button-icon-text">
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
              display: "grid",
              gridTemplateColumns: "auto auto",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              padding: "15px",
            }}
          >
            <Smile size={30} />
            <p className="h5">{importedReview?.author}</p>
          </div>
          <p className="review-grid-content description">{importedReview?.content}</p>
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
                <button className="button-pink button-icon-text">
                  <Flag size={16} />
                  Reported!
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
