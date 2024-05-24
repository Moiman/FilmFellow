import { authOptions } from "@/authOptions";
import { ReviewListItem } from "@/components/reviewListItem";
import { getReportsByCreatorId } from "@/services/reportService";
import { getImportedReviewsAndLocalReviewsById } from "@/services/reviewService";
import { getServerSession } from "next-auth";

interface Props {
  movieId: string;
  start?: number;
  end?: number;
}

export type UserReports = Awaited<ReturnType<typeof getReportsByCreatorId>>;

export const ReviewList = async ({ movieId, start, end }: Props) => {
  const session = await getServerSession(authOptions);
  let userReports: UserReports = [];
  if (session) {
    userReports = await getReportsByCreatorId();
  }
  const reviewsData = await getImportedReviewsAndLocalReviewsById(Number(movieId));

  return (
    <div className="review-grid">
      {reviewsData.reviews.slice(start ?? 0, end ?? reviewsData.reviews.length).map(review => (
        <ReviewListItem
          ownReview={review.user.id === session?.user.id ? true : false}
          userReports={userReports}
          key={review.id}
          review={review}
        />
      ))}
      {reviewsData.importedReviews.slice(start ?? 0, end ?? reviewsData.importedReviews.length).map(importedReview => (
        <ReviewListItem
          userReports={userReports}
          key={importedReview.id}
          importedReview={importedReview}
        />
      ))}
    </div>
  );
};
