"use client";
import Modal from "./modal";
import { Flag, Smile, Star } from "react-feather";
import { useSession } from "next-auth/react";

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
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <Smile
                style={{ marginLeft: "10px" }}
                size={30}
              />
              <h2>{review?.user.username}</h2>
            </div>
            <div style={{ marginRight: "10px" }}>
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
            <p className="review-grid-content description">{review.content}</p>
          </div>
          {session && (
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
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
            }}
          >
            <Smile
              style={{ marginLeft: "10px" }}
              size={30}
            />
            <h2>{importedReview?.author}</h2>
          </div>
          <p className="review-grid-content description">{importedReview?.content}</p>
          {session && (
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
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
