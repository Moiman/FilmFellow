import { Star } from "react-feather";

interface Props {
  rating: number | null;
  setRating: (stars: number) => Promise<void>;
  size?: number;
}

export const StarRating = ({ rating, setRating, size = 30 }: Props) => {
  return (
    <div style={{ display: "inline-flex" }}>
      {[1, 2, 3, 4, 5].map(starRating => (
        <button
          key={starRating}
          onClick={() => setRating(starRating)}
          className="button-transparent"
        >
          <Star
            stroke={rating && rating >= starRating ? "#ffc700" : "#eff2f2"}
            fill={rating && rating >= starRating ? "#ffc700" : "#eff2f2"}
            strokeWidth={2}
            size={size}
            style={{ cursor: "pointer" }}
          />
        </button>
      ))}
    </div>
  );
};
