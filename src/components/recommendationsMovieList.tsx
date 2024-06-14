import { MovieList } from "@/components/movieList";
import { getMovieRecommendations } from "@/services/getMovieRecommendations";
import { getUserRecommendations } from "@/services/getUserRecommendations";
import { getMovieByLimitTypeGenre } from "@/services/movieService";

type Props = {
  limit: number;
  selectedGenre: string | undefined;
  movieId: number | undefined;
};

export default async function RecommendationsMovieList({ limit, selectedGenre, movieId }: Props) {
  const recommendationMovies = movieId
    ? await getMovieRecommendations(movieId, limit)
    : await getUserRecommendations(selectedGenre, limit);

  if (!movieId && recommendationMovies.length === 0) {
    return (
      <>
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <h3 className="h5">
            Add movies to favorites or leave reviews to get <span className="yellow">personalized suggestions</span>!
          </h3>
          <h4 className="h6">Here&rsquo;s some popular movies you might enjoy:</h4>
        </div>

        <MovieList movies={await getMovieByLimitTypeGenre(36, "popular", selectedGenre)} />
      </>
    );
  }

  return (
    <MovieList
      movies={recommendationMovies}
      emptyText="No matches for similar movies. Browse our collection to find more films you'll like."
    />
  );
}
