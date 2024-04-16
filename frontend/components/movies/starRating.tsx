import { useState } from "react";

import { Star } from "react-feather";

interface StarRatingProps {
  onChange: (rating: number) => void;
}

export const StarRating = ({ onChange }: StarRatingProps) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (clickedRating: number) => {
    const newRating = clickedRating === rating ? 0 : clickedRating;

    setRating(newRating);
    onChange(newRating);
  };

  return (
    <div style={{ display: "inline-flex" }}>
      {[1, 2, 3, 4, 5].map(starRating => (
        <button
          onClick={() => handleStarClick(starRating)}
          className="button-transparent"
          key={starRating}
        >
          <Star
            stroke={rating >= starRating ? "#ffc700" : "#eff2f2"}
            fill={rating >= starRating ? "#ffc700" : "#eff2f2"}
            strokeWidth={2}
            size={30}
            style={{ cursor: "pointer" }}
          />
        </button>
      ))}
    </div>
  );
};
