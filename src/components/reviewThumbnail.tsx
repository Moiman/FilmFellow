"use client";
import { Flag, Smile, Star, Trash2 } from "react-feather";

import { Section } from "./section";
import { deleteReviewById, findReviewsByUserId } from "@/services/reviewService";
import { useState } from "react";
import Modal from "./modal";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
  };

  const ReviewHeader = () => {
    return (
      <div
        className="review-thumbnail-header"
        style={{ justifyContent: "space-between" }}
      >
        <Link href={"/movies/" + userReview.movieId}>{userReview.movie.title}</Link>
        <div className="stars">
          {[1, 2, 3, 4, 5].map(starRating => (
            <Star
              key={starRating}
              stroke={userReview.rating && userReview.rating >= starRating ? "#ffc700" : "#eff2f2"}
              fill={userReview.rating && userReview.rating >= starRating ? "#ffc700" : "#eff2f2"}
              strokeWidth={2}
              size={30}
            />
          ))}
        </div>
      </div>
    );
  };
  return (
    <Section header={ReviewHeader()}>
      <p
        className="review-grid-content description"
        onClick={() => setOpenReviewModal(true)}
      >
        {userReview.content.length > 303 ? userReview.content.slice(0, 300) + "..." : userReview.content}
      </p>
      {userReview.userId === session?.user.id && (
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
                <Smile
                  style={{ marginLeft: "10px" }}
                  size={30}
                />
                <Link
                  className="h2"
                  href={"/movies/" + userReview.movieId}
                >
                  {userReview.movie.title}
                </Link>
              </div>
              <div style={{ marginRight: "10px" }}>
                {[1, 2, 3, 4, 5].map(starRating => (
                  <Star
                    key={starRating}
                    stroke={userReview.rating && userReview.rating >= starRating ? "#ffc700" : "#eff2f2"}
                    fill={userReview.rating && userReview.rating >= starRating ? "#ffc700" : "#eff2f2"}
                    strokeWidth={2}
                    size={30}
                  />
                ))}
              </div>
            </div>
            <p className="review-grid-content description">{userReview.content}</p>
            {session && session.user.id !== userReview.userId && (
              <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
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
                    Reported!
                  </button>
                )}
              </div>
            )}
          </div>
        }
        isOpen={openReviewModal}
        closeModal={() => setOpenReviewModal(false)}
      />
    </Section>
  );
};
