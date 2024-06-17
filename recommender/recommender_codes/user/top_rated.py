import numpy as np
from typing import List, Dict

def top_rated(ratings: Dict[int, int]) -> List[int]:
    """
    Gives the top rated movies.

    Args:
        ratings (dict: int:float64): Rated movies as TMDB id: rating -pairs.
    Returns:
        List of integers: Top rated films.
    """

    if len(ratings) == 0:
        return []

    ratings = dict(sorted(ratings.items(), key=lambda item: item[1],
                              reverse=True))
    
    if len(ratings) > 2:
        return list(ratings.keys())[0:2]
    
    return list(ratings.keys())
