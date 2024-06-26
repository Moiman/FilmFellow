from recommender_codes.user.get_content_based_recommendations \
import get_content_based_recommendations
import numpy as np
from typing import List, Dict
from numpy.typing import NDArray

def content_based_filtering_user(TMDB_id: int,
                            n_recommendations: int,
                            MovieLens_to_TMDB: Dict[int, int],
                            TMDB_to_MovieLens: Dict[int, int],
                            movie_id_to_index: Dict[int, int],
                            movie_index_to_id: Dict[int, int],
                            cosine_sim: NDArray[np.float64]) -> List[int]:
    """
    Gives content based recommendations for a movie, with id that matches
    TMDB_id.

    Args:
        TMDB_id (int): TMDB id of the movie you want recommendations for.
        n_recommendations (int): The number of recommendations given.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.
        movie_id_to_index (dict (int:int)): MovieLens id mapped to cosine
        sim index.
        movie_index_to_id (dict (int:int)): Cosine sim index mapped to
        MovieLens id.
        cosine_sim (numpy 2D array: float64): Movies compared to each other
        in a matrix using cosine similarity as a metric. Each row and column
        index corresponds to a movie, row i and column i is the same movie.

    Returns:
        if movie is in the cosine sim:
        List of integers: List of recommended movies given as TMDB id.
        if movie is not in the cosine sim:
        Returns an empty list.
    """

    if TMDB_to_MovieLens[TMDB_id] not in movie_id_to_index.keys():
        return []

    recommendations = get_content_based_recommendations(
                            TMDB_id,
                            cosine_sim,
                            movie_id_to_index,
                            movie_index_to_id,
                            MovieLens_to_TMDB,
                            TMDB_to_MovieLens,
                            n_recommendations)

    return recommendations
