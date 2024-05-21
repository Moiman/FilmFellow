import { useState } from "react";
import { Smile, Star } from "react-feather";
import { ReviewModal } from "./reviewModal";
import { UserReports } from "@/app/movies/[id]/reviewList";
import Link from "next/link";

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
}

export const ReviewListItem = ({ review, importedReview, userReports }: Props) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openImportedReviewModal, setOpenImportedReviewModal] = useState(false);

  const checkIfReviewReported = () => {
    return userReports?.some(report => report.reviewId === review?.id) || false;
  };
  const checkIfImportedReviewReported = () => {
    return userReports?.some(report => report.importedReviewId === importedReview?.id) || false;
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
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
          <Smile
            style={{ marginLeft: "10px" }}
            size={30}
          />

            <Link className="h2" href={"/users/" + review.user.id}>{review.user.username}</Link>
          
        </div>
        <div style={{ marginRight: "10px" }}>
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
        }}
      >
        <Smile
          style={{ marginLeft: "10px" }}
          size={30}
        />
        <h2>{importedReview?.author}</h2>
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
    </div>
  );
};
