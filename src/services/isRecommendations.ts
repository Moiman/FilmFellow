import { getUserOwnFavoritesAndRatings } from "@/services/watchedService";
import { getUserRecommendations } from "./getUserRecommendations";

export const isRecommendations = async () => {
  try {
    const ratingsFavourites = await getUserOwnFavoritesAndRatings();
    const recommendations = await getUserRecommendations(undefined, 36);

    if (
      (ratingsFavourites.ratings.length === 0 && ratingsFavourites.favorites.length === 0) ||
      recommendations.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};
