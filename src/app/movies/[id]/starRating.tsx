import { useEffect, useState } from "react";
import { Star } from "react-feather";

interface Props {
  rating: number | null;
  setRating: (stars: number) => Promise<void>;
  size?: number;
}

export const StarRating = ({ rating, setRating, size = 30 }: Props) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number | null>(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleMouseOver = (starRating: number) => {
    setCurrentRating(null);
    setHoverRating(starRating);
  };

  const handleMouseOut = () => {
    setCurrentRating(rating);
    setHoverRating(null);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(starRating => (
        <button
          key={starRating}
          onClick={() => setRating(starRating)}
          onMouseOver={() => handleMouseOver(starRating)}
          onMouseOut={handleMouseOut}
          className="star-rating-button"
          aria-label={`Rate ${starRating} of 5 stars`}
          aria-pressed={rating === starRating ? "true" : "false"}
        >
          <Star
            className={
              (hoverRating && hoverRating >= starRating) || (currentRating !== null && currentRating >= starRating)
                ? "selected"
                : "not-selected"
            }
            strokeWidth={2}
            size={size}
          />
        </button>
      ))}
    </div>
  );
};
