import numpy as np
from typing import Dict, List
from recommender_codes.movie.get_content_based_recommendations \
import get_content_based_recommendations

def content_based_filtering(TMDB_id: int, 
                            n_recommendations: int,
                            MovieLens_to_TMDB: Dict[int, int],
                            TMDB_to_MovieLens: Dict[int, int]) -> List[int]:
    """
    Gives content based recommendations for a movie, with id that matches 
    TMDB_id.
    
    Args:
        TMDB_id (int): TMDB id of the movie you want recommendations for.
        n_recommendations (int): The number of recommendations given.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.
 
    Returns:
        if movie is in the cosine sim:
        List of integers: List of recommended movies given as TMDB id.
        if movie is not in the cosine sim:
        returns an empty list.
    """
    
    
    movie_id_to_index = np.load(
    "recommender_files/movie/content_based_filtering/movie_id_to_index.npy", 
        allow_pickle=True).item()
    movie_index_to_id = np.load(
    "recommender_files/movie/content_based_filtering/movie_index_to_id.npy", 
        allow_pickle=True).item()
    
    num_movies_in_cosine_sim = 1841
    cosine_sim = np.memmap(
    "recommender_files/movie/content_based_filtering/cosine_sim_memmap.npy", 
       dtype="float64", 
       mode='r', 
       shape=(num_movies_in_cosine_sim, num_movies_in_cosine_sim))
    
    if TMDB_to_MovieLens[TMDB_id] not in movie_id_to_index.keys():
        return []
    
    recommendations = get_content_based_recommendations(
                            TMDB_id, 
                            cosine_sim, 
                            movie_id_to_index, 
                            movie_index_to_id, 
                            MovieLens_to_TMDB, 
                            TMDB_to_MovieLens, 
                            n_recommendations)
    del cosine_sim
    
    return recommendations
    