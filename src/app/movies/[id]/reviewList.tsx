import { authOptions } from "@/authOptions";
import { ReviewListItem } from "@/components/reviewListItem";
import { getUserReports } from "@/services/reportService";
import { getImportedReviewsAndLocalReviewsById } from "@/services/reviewService";
import { getServerSession } from "next-auth";

interface Props {
  movieId: string;
  moviesCount?: number;
}

export type UserReports = Awaited<ReturnType<typeof getUserReports>>;

export const ReviewList = async ({ movieId, moviesCount }: Props) => {
  const session = await getServerSession(authOptions);
  let userReports: UserReports = [];
  if (session) {
    userReports = await getUserReports();
  }
  const reviewsData = await getImportedReviewsAndLocalReviewsById(Number(movieId));

  return (
    <div className="review-grid">
      {reviewsData.reviews.slice(0, moviesCount ?? reviewsData.reviews.length).map(review => (
        <ReviewListItem
          ownReview={review.user.id === session?.user.id}
          userReports={userReports}
          key={review.id}
          review={review}
        />
      ))}
      {reviewsData.importedReviews.slice(0, moviesCount ?? reviewsData.importedReviews.length).map(importedReview => (
        <ReviewListItem
          userReports={userReports}
          key={importedReview.id}
          importedReview={importedReview}
        />
      ))}
    </div>
  );
};
