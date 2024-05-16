import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from .vectorize_movie import vectorize_movie
from .get_content_based_recommendations_cosine_idx import \
get_content_based_recommendations_cosine_idx

def content_based_new_movie(movie_features, 
                            n_recommendations,
                            MovieLens_to_TMDB,
                            TMDB_to_MovieLens):
    """
    Gives content based recommendations for a new movie based on it's 
    features.'
    
    Args:
        movie_features (list: str): Features present in the movie: genres 
        and tags.
        n_recommendations (int): The number of recommendations given.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.
 
    Returns:
        List of integers: List of recommended movies given as TMDB id.
    """
    
    
    movie_index_to_id = np.load(
        "movie/content_based_filtering/movie_index_to_id.npy", 
        allow_pickle=True).item()
    
    num_movies_in_cosine_sim = 1841
    cosine_sim_new = np.memmap(
       "movie/content_based_filtering/cosine_sim_new_memmap.npy", 
       dtype="float64", 
       mode='r+', 
       shape=(num_movies_in_cosine_sim, num_movies_in_cosine_sim))
    
    matrix = pd.read_csv("movie/content_based_filtering/movies_matrix.csv")
    
    new_movie = vectorize_movie(movie_features, list(matrix))
    
    updated_matrix = np.vstack([matrix, new_movie])
    
    cosine_sim_new = cosine_similarity(updated_matrix, 
                                                     updated_matrix)
    
    recommendations = get_content_based_recommendations_cosine_idx(
                            cosine_sim_new.shape[0]-1, 
                            cosine_sim_new,  
                            movie_index_to_id, 
                            MovieLens_to_TMDB,  
                            n_recommendations)
    del cosine_sim_new
    
    return recommendations