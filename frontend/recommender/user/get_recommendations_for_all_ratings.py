import numpy as np
from average_of_movies import average_of_movies
from find_similar_movies_to_avg import find_similar_movies_to_avg

def get_recommendations_for_all_ratings(ratings, favourites,
                                        movie_id_to_index,
                                        movie_index_to_id,
                                        matrix):
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
        "MovieLens_to_TMDB.npy", 
        allow_pickle=True).item()
    TMDB_to_MovieLens = np.load(
        "TMDB_to_MovieLens.npy", 
        allow_pickle=True).item()
    movie_titles = np.load("movie_titles_list.npy", allow_pickle=True)
    
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