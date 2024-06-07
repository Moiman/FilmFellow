import { authOptions } from "@/authOptions";
import { ReviewListItem } from "@/components/reviewListItem";
import { getAllReviewsForMovie } from "@/services/reviewService";
import { getServerSession } from "next-auth";

interface Props {
  movieId: string;
  moviesCount?: number;
}

export const ReviewList = async ({ movieId, moviesCount }: Props) => {
  const session = await getServerSession(authOptions);

  const reviewsData = await getAllReviewsForMovie(Number(movieId));

  return (
    <div className="review-grid">
      {reviewsData.reviews.length + reviewsData.importedReviews.length > 0 ? (
        <>
          {reviewsData.reviews.slice(0, moviesCount ?? reviewsData.reviews.length).map(review => (
            <ReviewListItem
              ownReview={review.user.id === session?.user.id}
              key={review.id}
              review={review}
            />
          ))}
          {reviewsData.importedReviews
            .slice(0, moviesCount ?? reviewsData.importedReviews.length)
            .map(importedReview => (
              <ReviewListItem
                key={importedReview.id}
                importedReview={importedReview}
              />
            ))}
        </>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};
