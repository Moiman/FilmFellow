import random
from typing import List

def random_favourites(favourites: List[int]) -> List[int]:
    """
    Returns a maximum of two random favourited films.

    Args:
        favourites (list: int): TMDB_ids of favourite movies.

    Returns:
        if 2 or more favourites:
        List of integers: 2 randomly picked favourites as TMDB ids.
        if less than 2 favourites:
        returns all the favourites as TMDB ids.
    """

    if len(favourites) == 0:
        return []
    
    if len(favourites) > 2:
        random.shuffle(favourites)
        return favourites[0:2]

    return favourites