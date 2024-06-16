from typing import List, Dict

def clean_recommendations(
        recommendations: List[int],
        ratings: Dict[int, float],
        favourites: List[int],
        ) -> List[int]:
    """
    Removes duplicates, watched, rated and favourited movies from the 
    recommendations.

    Args:
        recommendations (list: int): Recommendations as TMDB ids.
        ratings (dict (int:float)): TMDB id mapped to the movies rating.
        favourites (list: int): Favourite movies as TMDB ids.

    Returns:
        List of integers: Cleaned recommendations.

    """
    recommendations = list(set(recommendations))

    recommended_movies = list(recommendations)
    for movie in recommended_movies:
        if str(movie) in list(ratings.keys()) or movie in favourites:
            recommendations.remove(movie)
            
    return recommendations