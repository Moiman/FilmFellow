import numpy as np
from typing import List

def get_movie_names_from_TMDB_ids(
        TMDB_ids: List[int]) -> List[str]:
    """
    Gives the names of the movies with given TMDB ids.
    
    Args:
        TMDB_ids (list of int): The TMDB ids as a list.
    
    Returns:
        list of str: The names of the movies with given TMDB ids in the same
        order as given.
    """
    
    TMDB_id_to_movie_title = np.load(
        "Recommender_files/manual_testing_and_debugging" +
        "/TMBD_id_to_movie_title.npy", 
        allow_pickle=True).item()
    
    movie_names = []
    for ID in TMDB_ids:
        movie_names.append(TMDB_id_to_movie_title[ID])
    return movie_names