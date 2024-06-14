import { getMovieByLimitTypeGenre } from "@/services/movieService";
import { getUserOwnFavoritesAndRatings } from "@/services/watchedService";

export const getUserRecommendations = async (selectedGenre: string | undefined, numRecos: number) => {
  const ratingsFavourites = await getUserOwnFavoritesAndRatings();
  const ratingsObject = {} as Record<number, number | null>;

  if (ratingsFavourites.ratings.length === 0 && ratingsFavourites.favorites.length === 0) {
    return [];
  }

  for (const rating of ratingsFavourites.ratings) {
    ratingsObject[rating.movieId] = rating.rating;
  }

  try {
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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const recommArr = await getMovieByLimitTypeGenre(numRecos, "", selectedGenre, data);
    return recommArr;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
