import { Star } from "react-feather";

export default function RatingStars({ stars, inputHandler }: { stars: number; inputHandler: any }) {
  const data = Array.from({ length: stars }, (_, index) => index);
  return (
    <div className="filter">
      <input
        type="checkbox"
        name={`rating${stars}`}
        onChange={e => inputHandler(e, `rating${stars}`)}
      />
      {data.map(star => (
        <Star
          key={star}
          className="selected"
          strokeWidth={2}
        />
      ))}
    </div>
  );
}
