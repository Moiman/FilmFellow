import { Star } from "react-feather";

import { Section } from "./section";
import { findReviewsBySessionHolder } from "@/services/reviewService";

interface Props {
  userReview: UserReview[0];
}
type UserReview = Awaited<ReturnType<typeof findReviewsBySessionHolder>>;

/* Currently purely cosmetic placeholder.
  In the future should be clickable and open the full review.
  Used in user profile and movie pages? */

export const ReviewThumbnail = ({userReview}: Props) => {
  const exampleReviewHeader = () => {
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
    <Section header={exampleReviewHeader()}>
      <p>{userReview.content.length > 303 ? userReview.content.slice(0, 300) + "..." : userReview.content}</p>
    </Section>
  );
};
