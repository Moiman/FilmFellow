import { getMovieByLimitTypeGenre } from "@/services/movieService";
import { getUserOwnFavoritesAndRatings } from "@/services/watchedService";

export const getUserRecommendations = async (selectedGenre: string | undefined, numRecos: number) => {
  const ratingsFavourites = await getUserOwnFavoritesAndRatings();
  const ratingsObject = {} as Record<number, number | null>;
  for (const rating of ratingsFavourites.ratings) {
    ratingsObject[rating.movieId] = rating.rating;
  }
  const response = await fetch(`${process.env.RECOMMENDER_URL}:${process.env.RECOMMENDER_PORT}/recommender/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ratings: ratingsObject,
      favourites: ratingsFavourites.favorites,
    }),
  });
  const data = await response.json();
  const recommArr = await getMovieByLimitTypeGenre(numRecos, "", selectedGenre, data);
  return recommArr;
};
