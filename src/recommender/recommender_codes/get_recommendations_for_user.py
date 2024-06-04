import numpy as np
from typing import List, Dict
from recommender_codes.user.restrict_favourites import restrict_favourites
from recommender_codes.user.top_rated import top_rated
from recommender_codes.user.collaborative_filtering_user \
import collaborative_filtering_user
from recommender_codes.user.content_based_filtering_user \
import content_based_filtering_user
from recommender_codes.user.get_recommendations_for_all_ratings import \
    get_recommendations_for_all_ratings
import scipy.sparse
import random

def get_recommendations_for_user(ratings: Dict[int, float], favourites:
    List[int]) -> List[int]:
    """
    Gives recommendations for a user with movie ratings and favourited movies.

    Args:
        ratings (dict: int:float): The given ratings as TMDB id: rating value
        pairs.
        favourites (list: int): The list of favourited movies as TMDB ids.
    Returns:
        if input is given in a correct form:
        List of integers: TMDB ids of the recommended movies.
        if input is not given in a correct form:
        Returns an empty list.
    """
    try:
        ratings = dict(map(lambda item: (int(item[0]), item[1]), ratings.items()))
    except ValueError:
        print("All the values are not convertable to integers!")
        ratings = {}

    TMDB_ids = np.load("Recommender_files/user/TMDB_ids.npy")

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
            ratings.pop(movie)

    favourited_movies = list(favourites)
    for movie in favourited_movies:
        if movie not in TMDB_ids:
            favourites.remove(movie)

    if len(ratings) + len(favourites) < 1:
        print("None of the movies are in the MovieLens data!")
        return []

    MovieLens_to_TMDB = np.load(
        "Recommender_files/user/MovieLens_to_TMDB.npy",
        allow_pickle=True).item()
    TMDB_to_MovieLens = np.load(
        "Recommender_files/user/TMDB_to_MovieLens.npy",
        allow_pickle=True).item()
    movie_id_to_index_con = np.load(
        "Recommender_files/user/content_based_filtering/movie_id_to_index.npy",
        allow_pickle=True).item()
    movie_index_to_id_con = np.load(
        "Recommender_files/user/content_based_filtering/movie_index_to_id.npy",
        allow_pickle=True).item()
    movie_id_to_index_coll = np.load(
        "Recommender_files/user/collaborative_filtering/movie_mapper.npy",
        allow_pickle=True).item()
    movie_index_to_id_coll = np.load(
    "Recommender_files/user/collaborative_filtering/movie_inverse_mapper.npy",
        allow_pickle=True).item()
    matrix = scipy.sparse.load_npz(
        "Recommender_files/user/collaborative_filtering/sparse_matrix.npz")

    num_movies_in_cosine_sim = 1841
    cosine_sim = np.memmap(
       "Recommender_files/user/content_based_filtering/cosine_sim_memmap.npy",
       dtype="float64",
       mode='r',
       shape=(num_movies_in_cosine_sim, num_movies_in_cosine_sim))

    favourites = restrict_favourites(favourites)

    top_rated_movies = top_rated(ratings, favourites)

    recommendations = []

    for movie in top_rated_movies:
        collaborative = collaborative_filtering_user(movie,
                                                10,
                                                MovieLens_to_TMDB,
                                                TMDB_to_MovieLens,
                                                movie_id_to_index_coll,
                                                movie_index_to_id_coll,
                                                matrix)
        content_based = content_based_filtering_user(movie,
                                                10,
                                                MovieLens_to_TMDB,
                                                TMDB_to_MovieLens,
                                                movie_id_to_index_con,
                                                movie_index_to_id_con,
                                                cosine_sim)
        if len(collaborative) >= 1:
            recommendations.extend(collaborative)

        if len(content_based) >= 1:
            recommendations.extend(content_based)

    del cosine_sim

    recommendations.extend(get_recommendations_for_all_ratings(ratings,
                                                           favourites,
                                                    movie_id_to_index_coll,
                                                    movie_index_to_id_coll,
                                                    matrix))

    recommendations = list(set(recommendations))
    random.shuffle(recommendations)

    for movie in recommendations:
        if movie in ratings.keys() or movie in favourites:
            recommendations.remove(movie)

    return recommendations
