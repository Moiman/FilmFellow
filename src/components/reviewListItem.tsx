import { useSession } from "next-auth/react";
import { useState } from "react";
import { Flag, Star } from "react-feather";
import { ReviewModal } from "./reviewModal";
import { UserReports } from "@/app/movies/[id]/reviewList";

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
  const { data: session } = useSession();
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openImportedReviewModal, setOpenImportedReviewModal] = useState(false);

  const checkIfReviewReported = () => {
    return userReports?.some(report => report.reviewId === review?.id) || false;
  }
  const checkIfImportedReviewReported = () => {
    return userReports?.some(report => report.importedReviewId === importedReview?.id) || false;
  };

  return review ? (
    <div className="review-grid-item">
      <div style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", gap: "10px" }}>
        <h2>{review.user.username}</h2>
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
        {review.content}
      </p>
      <ReviewModal
        reviewReported={checkIfReviewReported()}
        review={review}
        isModalOpen={openReviewModal}
        setIsModalOpen={setOpenReviewModal}
      />

      {session && (
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
          {!checkIfReviewReported() ? (
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
  ) : (
    <div className="review-grid-item">
      <div style={{ display: "grid", gridTemplateColumns: "auto auto", alignItems: "center", gap: "10px" }}>
        <h2>{importedReview?.author}</h2>
      </div>

      <p
        onClick={() => setOpenImportedReviewModal(true)}
        className="review-grid-content description"
      >
        {importedReview?.content}
      </p>
      <ReviewModal
        importedReviewReported={checkIfImportedReviewReported()}
        importedReview={importedReview}
        isModalOpen={openImportedReviewModal}
        setIsModalOpen={setOpenImportedReviewModal}
      />
      {session && (
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}>
          {!checkIfImportedReviewReported() ? (
            <form action={`/report/review/${importedReview?.id}`}>
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
};
