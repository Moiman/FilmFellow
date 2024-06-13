from typing import Dict

def restrict_ratings(ratings: Dict[str, float]) -> Dict[str, float]:
    """
    Restricts rated movies to 10 randomnly picked ratings if there is
    more than 10 movies.

    Args:
        ratings (dict: str:float): TMDB_ids of rated movies mapped to rating value.

    Returns:
        if more than 10 ratings:
        Dict of string float pairs: 10 randomly picked rated movies as TMDB id: rating -pairs.
        if 10 or less ratings:
        returns all the ratings as TMDB id: rating -pairs.
    """
    
    top_rated = {}

    ratings = dict(sorted(ratings.items(), key=lambda item: item[1],
                              reverse=True))
    top_10_ratings = 0

    if len(ratings) >= 10:
        top_10_ratings = list(ratings.values())[9]
    else:
        return ratings

    for movie in ratings.keys():
        if ratings[movie] >= top_10_ratings:
            top_rated[movie] = ratings[movie]

    return top_rated
