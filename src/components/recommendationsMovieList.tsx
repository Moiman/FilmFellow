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
      emptyText={
        movieId
          ? "No matches for similar movies. Browse our collection to find more films you'll like."
          : "Add your favorite movies or leave reviews to get personalized suggestions!"
      }
    />
  );
}
