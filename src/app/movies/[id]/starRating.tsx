import { Star } from "react-feather";

interface Props {
  rating: number | null;
  setRating: (stars: number) => Promise<void>;
  size?: number;
}

export const StarRating = ({ rating, setRating, size = 30 }: Props) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(starRating => (
        <button
          key={starRating}
          onClick={() => setRating(starRating)}
          className="star-rating-button"
          aria-label={`Rate ${starRating} of 5 stars`}
          aria-pressed={rating === starRating ? "true" : "false"}
        >
          <Star
            className={rating !== null && rating >= starRating ? "selected" : "not-selected"}
            strokeWidth={2}
            size={size}
          />
        </button>
      ))}
    </div>
  );
};
