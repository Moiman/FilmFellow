import numpy as np
import pandas as pd
from typing import Dict, List
from sklearn.metrics.pairwise import cosine_similarity
from recommender_codes.movie.vectorize_movie import vectorize_movie
from recommender_codes.movie.get_content_based_recommendations_cosine_idx \
import get_content_based_recommendations_cosine_idx

def content_based_features(TMDB_id: int,
                            movie_features: List[str],
                            n_recommendations: int,
                            MovieLens_to_TMDB: Dict[int, int],
                            TMDB_to_MovieLens: Dict[int, int]) -> List[int]:
    """
    Gives content based recommendations for a movie based on it's
    features.

    Args:
        TMDB_id: int: TMDB id of the movie.
        movie_features (list: str): Features present in the movie: genres
        and tags.
        n_recommendations (int): The number of recommendations given.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.

    Returns:
        List of integers: List of recommended movies given as TMDB id.
    """

    TMDB_ids = np.load("Recommender_files/user/TMDB_ids.npy")
    movie_index_to_id = np.load(
    "Recommender_files/movie/content_based_filtering/movie_index_to_id.npy",
        allow_pickle=True).item()
    movie_id_to_index = np.load(
    "Recommender_files/movie/content_based_filtering/movie_id_to_index.npy",
        allow_pickle=True).item()

    num_movies_in_cosine_sim = 1841
    cosine_sim_new = np.memmap(
        "Recommender_files/movie/content_based_filtering" +
        "/cosine_sim_new_memmap.npy",
       dtype="float64",
       mode='r+',
       shape=(num_movies_in_cosine_sim, num_movies_in_cosine_sim))

    matrix = pd.read_csv("Recommender_files/movie/content_based_filtering" +
    "/movies_matrix.csv")

    new_movie = vectorize_movie(movie_features, list(matrix))

    updated_matrix = np.vstack([matrix, new_movie])

    cosine_sim_new = cosine_similarity(updated_matrix,
                                                     updated_matrix)
    
    if TMDB_id not in TMDB_ids:
        TMDB_id = -1
    elif TMDB_to_MovieLens[TMDB_id] not in movie_id_to_index.keys():
        TMDB_id = -1

    recommendations = get_content_based_recommendations_cosine_idx(
                            TMDB_id,
                            cosine_sim_new.shape[0]-1,
                            cosine_sim_new,
                            movie_index_to_id,
                            MovieLens_to_TMDB,
                            TMDB_to_MovieLens,
                            n_recommendations)
    del cosine_sim_new

    return recommendations
