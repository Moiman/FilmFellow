import { useState } from "react";
import { Star } from "react-feather";

interface StarRatingProps {
  onChange: (rating: number) => void;
}

export const StarRating = ({ onChange }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [previousRating, setPreviousRating] = useState(0);

  const handleMouseOver = (hoveredRating: number) => {
    setPreviousRating(rating);
    setRating(0);
    setHoverRating(hoveredRating);
  };

  const handleMouseOut = () => {
    setRating(previousRating);
    setHoverRating(0);
  };

  const handleClick = (clickedRating: number) => {
    const newRating = clickedRating === rating ? 0 : clickedRating;

    setRating(newRating);
    setPreviousRating(newRating);
    onChange(newRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(index => (
        <Star
          key={index}
          onClick={() => handleClick(index)}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={handleMouseOut}
          stroke={hoverRating >= index ? "#dea000" : rating >= index ? "#ffc700" : "#eff2f2"}
          fill={hoverRating >= index ? "#dea000" : rating >= index ? "#ffc700" : "#eff2f2"}
          strokeWidth={2}
          size={30}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};
