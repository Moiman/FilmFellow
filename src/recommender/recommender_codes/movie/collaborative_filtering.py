import numpy as np
from typing import List, Dict
from recommender_codes.movie.find_similar_movies import find_similar_movies

def collaborative_filtering(TMDB_id: int,
                            n_recommendations: int,
                            MovieLens_to_TMDB: Dict[int, int],
                            TMDB_to_MovieLens: Dict[int, int]) -> List[int]:
    """
    Gives collaborative filtering recommendations for a movie, with id that
    matches TMDB_id.

    Args:
        TMDB_id (int): TMDB id of the movie you want recommendations for.
        n_recommendations (int): The number of recommendations given.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.

    Returns:
        List of integers: List of recommended movies given as TMDB id.
    """

    movie_id_to_index = np.load(
        "Recommender_files/movie/collaborative_filtering/movie_mapper.npy",
        allow_pickle=True).item()
    movie_index_to_id = np.load(
        "Recommender_files/movie/collaborative_filtering" +
        "/movie_inverse_mapper.npy",
        allow_pickle=True).item()

    num_movies_in_matrix = 83239
    num_singular_values = 100
    matrix = np.memmap(
        "Recommender_files/movie/collaborative_filtering" +
        "/singular_matrix_memmap.npy",
       dtype="float64",
       mode='r',
       shape=(num_movies_in_matrix, num_singular_values))

    recommendations = find_similar_movies(
                            TMDB_id,
                            matrix,
                            movie_id_to_index,
                            movie_index_to_id,
                            MovieLens_to_TMDB,
                            TMDB_to_MovieLens,
                            n_recommendations,
                            metric='euclidean')
    del matrix

    return recommendations
