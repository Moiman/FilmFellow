import numpy as np

def get_movie_name_from_TMDB_id(
        TMDB_ids):
    """
    Gives the names of the movies with given TMDB ids.
    
    Args:
        TMDB_ids (list of int): The TMDB ids as a list.
    
    Returns:
        list of str: The names of the movies with given TMDB ids in the same
        order as given.
    """
    
    TMDB_id_to_movie_title = np.load(
        "TMBD_id_to_movie_title.npy", 
        allow_pickle=True).item()
    
    movie_names = []
    for ID in TMDB_ids:
        movie_names.append(TMDB_id_to_movie_title[ID])
    return movie_names