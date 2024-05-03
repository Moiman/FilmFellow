import numpy as np
from get_content_based_recommendations import get_content_based_recommendations

def content_based_filtering(TMDB_id, 
                            n_recommendations,
                            MovieLens_to_TMDB,
                            TMDB_to_MovieLens):
    """
    Gives content based recommendations for a movie, with id that matches 
    TMDB_id.
    
    Args:
        TMDB_id (int): TMDB id of the movie you want recommendations for.
        n_recommendations (int): The number of recommendations given.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.
 
    Returns:
        List of integers: List of recommended movies given as TMDB id.
    """
    
    
    movie_id_to_index = np.load(
        "content_based_filtering/movie_id_to_index.npy", 
        allow_pickle=True).item()
    movie_index_to_id = np.load(
        "content_based_filtering/movie_index_to_id.npy", 
        allow_pickle=True).item()
    
    num_movies_in_cosine_sim = 1841
    cosine_sim = np.memmap(
       "content_based_filtering/cosine_sim_memmap.npy", 
       dtype="float64", 
       mode='r', 
       shape=(num_movies_in_cosine_sim, num_movies_in_cosine_sim))
    
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
    