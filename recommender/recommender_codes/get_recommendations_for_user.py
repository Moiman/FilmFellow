import numpy as np
from typing import List, Dict
from recommender_codes.user.clean_recommendations import \
      clean_recommendations
from recommender_codes.user.restrict_favourites import restrict_favourites
from recommender_codes.user.get_recommendations_for_all_ratings import \
    get_recommendations_for_all_ratings
from recommender_codes.user.collaborative_filtering_user import \
    collaborative_filtering_user
from recommender_codes.user.top_rated import top_rated
from recommender_codes.user.random_favourites import random_favourites
import scipy.sparse
import random

def get_recommendations_for_user(ratings: Dict[str, float], favourites:
    List[int]) -> List[int]:
    """
    Gives recommendations for a user with movie ratings and favourited movies.

    Args:
        ratings (dict: str:float): The given ratings as TMDB id: rating value
        pairs.
        favourites (list: int): The list of favourited movies as TMDB ids.
    Returns:
        if input is given in a correct form:
        List of integers: TMDB ids of the recommended movies.
        if input is not given in a correct form:
        Returns an empty list.
    """
    original_ratings = dict(ratings)
    original_favourites = list(favourites)

    try:
        ratings = dict(map(lambda item: (int(item[0]), item[1]), 
        ratings.items()))
    except ValueError:
        print("All the ids are not convertable to integers!")
        ratings = {}

    TMDB_ids = np.load("Recommender_files/user/TMDB_ids.npy")
    TMDB_to_MovieLens = np.load("Recommender_files/user/TMDB_to_MovieLens.npy",
        allow_pickle=True).item()
    movie_id_to_index = np.load(
        "Recommender_files/user/collaborative_filtering/movie_mapper.npy",
        allow_pickle=True).item()
    movie_index_to_id = np.load(
    "Recommender_files/user/collaborative_filtering/movie_inverse_mapper.npy",
        allow_pickle=True).item()
    matrix = scipy.sparse.load_npz(
        "Recommender_files/user/collaborative_filtering/sparse_matrix.npz")

    if len(ratings) + len(favourites) < 1:
        print("Give at least one movie as rating or a favourite!")
        return []

    if not all(isinstance(elem, int) for elem in ratings.keys()):
        print("All the rated movie ids must be integers!")
        return []

    if not all((isinstance(elem, float) or isinstance(elem, int)) for elem in
               ratings.values()):
        print("All the ratings must be numbers!")
        return []

    if not all(isinstance(elem, int) for elem in favourites):
        print("All the favourite movie ids must be integers!")
        return []

    rated_movies = list(ratings.keys())
    for movie in rated_movies:
        if movie not in TMDB_ids:
            ratings.pop(movie, None)
        elif TMDB_to_MovieLens[movie] not in movie_id_to_index.keys():
            ratings.pop(movie, None)

    favourited_movies = list(favourites)
    for movie in favourited_movies:
        if movie not in TMDB_ids:
            favourites.remove(movie)
        elif TMDB_to_MovieLens[movie] not in movie_id_to_index.keys():
            favourites.remove(movie)

    if len(ratings) + len(favourites) < 1:
        print("None of the movies are in the MovieLens data!")
        return []

    favourites = restrict_favourites(favourites)

    recommendations = []

    recommendations.extend(get_recommendations_for_all_ratings(ratings,
                                                           favourites,
                                                    movie_id_to_index,
                                                    movie_index_to_id,
                                                    matrix))

    recommendations = clean_recommendations(recommendations, original_ratings, 
                                            original_favourites)
    
    if len(recommendations) < 10:
        MovieLens_to_TMDB = np.load(
        "user/MovieLens_to_TMDB.npy", 
        allow_pickle=True).item()

        top_movies = top_rated(ratings)
        top_movies.extend(random_favourites(favourites))
        for movie in top_movies:
            recommendations.extend(collaborative_filtering_user(movie,
                                         10,
                                         MovieLens_to_TMDB,
                                         TMDB_to_MovieLens,
                                         movie_id_to_index,
                                         movie_index_to_id,
                                         matrix))
        recommendations = clean_recommendations(recommendations, 
                                                original_ratings, 
                                            original_favourites)

    random.shuffle(recommendations)

    return recommendations
