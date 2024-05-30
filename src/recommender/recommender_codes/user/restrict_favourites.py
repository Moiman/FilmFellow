import random
from typing import List

def restrict_favourites(favourites: List[int]) -> List[int]:
    """
    Restricts favourite movies to 10 randomnly picked favourites if there is
    more than 10 movies.

    Args:
        favourites (list: int): TMDB_ids of favourite movies.

    Returns:
        if more than 10 favourites:
        List of integers: 10 randomly picked favourites as TMDB ids.
        if 10 or less favourites:
        returns all the favourites as TMDB ids.
    """

    if len(favourites) > 10:
        random.shuffle(favourites)
        return favourites[0:10]

    return favourites
