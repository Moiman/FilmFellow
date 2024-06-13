import { Suspense } from "react";
import { Star } from "react-feather";
import RecommendationsMovieList from "./recommendationsMovieList";

type Props = {
  limit?: number;
  selectedGenre?: string | undefined;
  movieId?: number;
};

export default function RecommendationsList({ limit = 6, selectedGenre = undefined, movieId }: Props) {
  return (
    <Suspense
      key={selectedGenre}
      fallback={
        <div className="rotating-star-div">
          <Star />
          <p>Loading recommendations for you...</p>
        </div>
      }
    >
      <RecommendationsMovieList
        limit={limit}
        selectedGenre={selectedGenre}
        movieId={movieId}
      />
    </Suspense>
  );
}
