import { getUserOwnFavoritesAndRatings } from "@/services/watchedService";

export const isRecommendations = async () => {
  try {
    const ratingsFavourites = await getUserOwnFavoritesAndRatings();
    if (ratingsFavourites.ratings.length === 0 && ratingsFavourites.favorites.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};
