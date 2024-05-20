"use client";
import { Smile, Star } from "react-feather";

import { Section } from "./section";
import { findReviewsBySessionHolder } from "@/services/reviewService";
import { useState } from "react";
import Modal from "./modal";

interface Props {
  userReview: UserReview[0];
}
type UserReview = Awaited<ReturnType<typeof findReviewsBySessionHolder>>;

export const ReviewThumbnail = ({ userReview }: Props) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const ReviewHeader = () => {
    return (
      <div className="review-thumbnail-header">
        <h6>{userReview.movie.title}</h6>
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
      <p onClick={() => setOpenReviewModal(true)}>
        {userReview.content.length > 303 ? userReview.content.slice(0, 300) + "..." : userReview.content}
      </p>
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
                <h2>{userReview.movie.title}</h2>
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
              <p className="review-grid-content description">{userReview.content}</p>
            </div>
          </div>
        }
        isOpen={openReviewModal}
        closeModal={() => setOpenReviewModal(false)}
      />
    </Section>
  );
};
