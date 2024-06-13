import { getMovieByLimitTypeGenre } from "@/services/movieService";
import { getUserOwnFavoritesAndRatings } from "@/services/watchedService";

export const getUserRecommendations = async (selectedGenre: string | undefined, numRecos: number) => {
  const ratingsFavourites = await getUserOwnFavoritesAndRatings();
  const ratingsObject = {} as Record<number, number | null>;
  for (const rating of ratingsFavourites.ratings) {
    ratingsObject[rating.movieId] = rating.rating;
  }
  const response = await fetch("http://localhost:5000/recommender/user", {
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
