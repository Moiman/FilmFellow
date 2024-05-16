import numpy as np
from .content_based_new_movie import content_based_new_movie
from .feature_formatter import feature_formatter

def get_recommendations_for_new_movie(movie_features, n_recommendations=100):
    """
    Gives content based recommendations for a new movie, not found on the 
    MovieLens data.
    
    Args:
        movie_features (list: str): Features present in the movie: genres 
        and tags.
        n_recommendations (int): The number of recommendations given.
    
    Returns:
        if input is given in a correct form: 
        List of integers: List of recommended movies given as TMDB id.
        if input is not given in a correct form:
        Returns an empty list.
    """
    
    if len(movie_features) < 1:
        print("Give at least one feature!")
        return []
    
    if not all(isinstance(elem, str) for elem in movie_features):
        print("All the movie features must be string values!")
        return []
    
    if type(n_recommendations) != int:
        print("Number of recommendations must be an integer!")
        return []
    
    if n_recommendations < 1:
        print("Number of recommendations needs to be at least 1.")
        return []
    
    if n_recommendations > 1800:
        print("Too many recommendations! Content based filtering has only " +
              "little more than 1800 movies!")
        return []
        
    movie_features = feature_formatter(movie_features)
    
    MovieLens_to_TMDB = np.load(
        "movie/content_based_filtering/MovieLens_to_TMDB.npy", 
        allow_pickle=True).item()
    TMDB_to_MovieLens = np.load(
        "movie/content_based_filtering/TMDB_to_MovieLens.npy", 
        allow_pickle=True).item()
    
    recommendations = content_based_new_movie(movie_features, 
                                            n_recommendations,
                                            MovieLens_to_TMDB,
                                            TMDB_to_MovieLens)
    
    return recommendations