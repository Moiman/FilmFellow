import numpy as np
from typing import List
from recommender_codes.movie.get_num_recommendations \
import get_num_recommendations
from recommender_codes.movie.collaborative_filtering \
import collaborative_filtering
from recommender_codes.movie.content_based_filtering \
import content_based_filtering

def get_recommendations_for_movie(
        TMDB_id: int, 
        n_recommendations: int = 300) -> List[int]: 
    """
    Gives collaborative and content based recommendations for a movie, 
    with id that matches TMDB_id.
    
    Args:
        TMDB_id (int): TMDB id of the movie you want recommendations for.
        n_recommendations (int): The number of recommendations given. Needs to
        be a multiple of two: 2, 4, 6, 8, 10, 12, ...
    
    Returns:
        if input is given correctly: 
        List of integers: List of recommended movies given as TMDB id. It has
        the most similar movie first from collaborative filtering model, the
        most similar from content based second, the second most similar movie
        from collaborative, the second most similar from content based and so 
        on, even indexes having collaborative recommendations, odd having 
        content based recommendations. If content based recommendations have
        the same recommendations as collaborative (as it often does), these 
        duplicates are left out. This is why there will be less recommendations
        than n_recommendations, but at least half of n_recommendations.
        if the input is not of correct form:
        returns an empty list.
    """
    TMDB_ids = np.load("recommender_files/movie/TMDB_ids.npy")
    
    if type(TMDB_id) != int:
        print("TMDB id must be an integer!")
        return []
    
    if TMDB_id not in TMDB_ids:
        print("Id not found!")
        return []
    
    if type(n_recommendations) != int:
        print("Number of recommendations must be an integer!")
        return []
    
    if n_recommendations < 1:
        print("Number of recommendations needs to be at least 1.")
        return []
    
    if n_recommendations % 2 != 0:
        print("The number of recommendations must be a multiple of two!")
        return []
    
    if n_recommendations > 80000:
        print("Too many recommendations! The recommender has only a " +
              "little more than 80,000 movies!")
        return []
    
    MovieLens_to_TMDB = np.load(
        "recommender_files/movie/MovieLens_to_TMDB.npy", 
        allow_pickle=True).item()
    TMDB_to_MovieLens = np.load(
        "recommender_files/movie/TMDB_to_MovieLens.npy", 
        allow_pickle=True).item()
    
    num_of_collaborative, num_of_content_based = \
        get_num_recommendations(n_recommendations)
    
    collaborative = collaborative_filtering(TMDB_id, 
                                            num_of_collaborative,
                                            MovieLens_to_TMDB,
                                            TMDB_to_MovieLens)
    content_based = content_based_filtering(TMDB_id, 
                                            num_of_content_based,
                                            MovieLens_to_TMDB,
                                            TMDB_to_MovieLens)
    
    recommendations = []
    recommendations_count = len(collaborative) + len(content_based)
    col_ind = 0
    con_ind = 0
    for index in range(recommendations_count):
        if index % 2 == 0 or con_ind > len(content_based) - 1:
            if collaborative[col_ind] not in recommendations:
                recommendations.append(collaborative[col_ind])
            col_ind += 1
        else:
            if content_based[con_ind] not in recommendations:
                recommendations.append(content_based[con_ind])
            con_ind += 1
    
    return recommendations