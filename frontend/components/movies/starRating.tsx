import { useState } from "react";
import { Star } from "react-feather";

interface StarRatingProps {
  onChange: (rating: number) => void;
}

export const StarRating = ({ onChange }: StarRatingProps) => {
  const [rating, setRating] = useState(0);

  const handleClick = (clickedRating: number) => {
    const newRating = clickedRating === rating ? 0 : clickedRating;

    setRating(newRating);
    onChange(newRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(index => (
        <Star
          key={index}
          onClick={() => handleClick(index)}
          stroke={rating >= index ? "#ffc700" : "#eff2f2"}
          fill={rating >= index ? "#ffc700" : "#eff2f2"}
          strokeWidth={2}
          size={30}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};