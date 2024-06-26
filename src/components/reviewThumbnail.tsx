"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Flag, Star, Trash2 } from "react-feather";
import { deleteReviewById, findReviewsByUserId } from "@/services/reviewService";
import Modal from "./modal";

interface Props {
  userReview: UserReview[0];
}

type UserReview = Awaited<ReturnType<typeof findReviewsByUserId>>;

export const ReviewThumbnail = ({ userReview }: Props) => {
  const { data: session } = useSession();
  const [openReviewModal, setOpenReviewModal] = useState(false);

  const checkIfReviewReported = () => {
    return userReview?.reports.some(report => report.reviewId === userReview?.id) || false;
  };

  const handleDeleteReview = async () => {
    await deleteReviewById(Number(userReview.id));
    toast(<p>Your review was deleted</p>, {
      icon: <Trash2 strokeWidth={2.5} />,
      className: "pink-toast",
    });
  };

  return (
    <div className="review-grid-item">
      <div className="review-header-item">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <Link
            className="h5"
            href={"/movies/" + userReview.movieId}
          >
            {userReview.movie.title}
          </Link>
        </div>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(starRating => (
            <Star
              key={starRating}
              className={userReview.rating && userReview.rating >= starRating ? "selected" : "not-selected"}
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
        <p>{userReview.content}</p>
      </button>
      {userReview.userId === session?.user.id && (
        <div className="review-grid-footer bg-yellow">
          <button
            onClick={handleDeleteReview}
            className="button-transparent"
            aria-label="Delete review"
          >
            <Trash2
              className="dark-icon"
              size={20}
            />
          </button>
        </div>
      )}
      <Modal
        content={
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
                <Link
                  className="h5"
                  href={"/movies/" + userReview.movieId}
                >
                  {userReview.movie.title}
                </Link>
              </div>
              <div>
                {[1, 2, 3, 4, 5].map(starRating => (
                  <Star
                    key={starRating}
                    stroke={userReview.rating && userReview.rating >= starRating ? "#ffc700" : "#eff2f2"}
                    fill={userReview.rating && userReview.rating >= starRating ? "#ffc700" : "#eff2f2"}
                    strokeWidth={2}
                    size={20}
                  />
                ))}
              </div>
            </div>
            <p className="review-modal-content description">{userReview.content}</p>
            {session && session.user.id !== userReview.userId && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {!checkIfReviewReported() ? (
                  <form action={`/report/review/${userReview.id}`}>
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
                    Review reported!
                  </button>
                )}
              </div>
            )}
          </div>
        }
        isOpen={openReviewModal}
        closeModal={() => setOpenReviewModal(false)}
      />
    </div>
  );
};
