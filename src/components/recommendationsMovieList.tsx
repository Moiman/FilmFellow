import { MovieList } from "@/components/movieList";
import { getMovieRecommendations } from "@/services/getMovieRecommendations";
import { getUserRecommendations } from "@/services/getUserRecommendations";

type Props = {
  limit: number;
  selectedGenre: string | undefined;
  movieId: number | undefined;
};

export default async function RecommendationsMovieList({ limit, selectedGenre, movieId }: Props) {
  const recommendationMovies = movieId
    ? await getMovieRecommendations(movieId, limit)
    : await getUserRecommendations(selectedGenre, limit);

  return (
    <MovieList
      movies={recommendationMovies}
      emptyText="No recommendations yet"
    />
  );
}
