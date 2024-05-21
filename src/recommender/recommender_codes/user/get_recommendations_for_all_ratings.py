import numpy as np
from recommender_codes.user.average_of_movies import average_of_movies
from recommender_codes.user.find_similar_movies_to_avg \
import find_similar_movies_to_avg
from typing import List, Dict
from scipy.sparse import csr_matrix

def get_recommendations_for_all_ratings(ratings: Dict[int, float], 
                                        favourites: List[int],
                                        movie_id_to_index: Dict[int, int],
                                        movie_index_to_id: Dict[int, int],
                                        matrix: csr_matrix) -> List[int]:
    """
    Gives recommendations based on the average movie vector created from the
    most liked films.
    
    Args:
        ratings (dict: int:float64): Rated movies as TMDB id: rating pairs.
        favourites (list: int): Favourited movies as TMDB ids.
        movie_id_to_index (dict (int:int)): MovieLens id mapped to matrix 
        index.
        movie_index_to_id (dict (int:int)): Matrix index mapped to  MovieLens 
        id.
        matrix (Numpy sparse matrix: float16): Matrix with users as columns and
        movies as rows. User i rating for movie j is the element ji.
    Returns:
        if there is better than average ratings:
        List of integers: Recommendations as TMDB ids.
        If there is not better than average ratings:
        Returns empty list.
    """
    
    MovieLens_to_TMDB = np.load(
        "recommender_files/user/MovieLens_to_TMDB.npy", 
        allow_pickle=True).item()
    TMDB_to_MovieLens = np.load(
        "recommender_files/user/TMDB_to_MovieLens.npy", 
        allow_pickle=True).item()
    movie_titles = np.load("recommender_files/user/movie_titles_list.npy", 
    allow_pickle=True)
    
    avg_movie_vector = average_of_movies(ratings, 
                                     favourites,
                                     matrix, 
                                     movie_id_to_index,
                                     movie_titles,
                                     TMDB_to_MovieLens)
    
    if len(avg_movie_vector) != 0:
        recommendations = find_similar_movies_to_avg(
                                                 np.asarray(avg_movie_vector), 
                                                 matrix,
                                                 movie_id_to_index, 
                                                 movie_index_to_id, 
                                                 MovieLens_to_TMDB,
                                                 500)
    else:
        recommendations = []
    
    return recommendations