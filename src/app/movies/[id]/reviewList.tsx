
interface User {
  id: number;
  username: string;
}

interface Review {
  id: number;
  movieId: number;
  content: string;
  user: User;
  // created_at: Date;
  // updated_at: Date;
  // userId: number;
}

interface ImportedReview {
  id: string;
  movieId: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  author: string;
}

interface WatchedRating {
  userId: number;
  movieId: number;
  rating: number | null;
}

interface Props {
  importedReviews: ImportedReview[] | undefined;
  reviews: Review[] | undefined;
  watchedRatings: WatchedRating[] | undefined;
}

export const ReviewList = ({ importedReviews, reviews, watchedRatings }: Props) => {
  console.log(importedReviews);
  console.log(watchedRatings);
  return (
    <div className="review-grid">
      {reviews?.map(review => (
        <div
          key={review.id}
          className="review-grid-item"
        >
          <p className="description">{review.content}{review.user.username}</p>
        </div>
      ))}
    </div>
  );
};
