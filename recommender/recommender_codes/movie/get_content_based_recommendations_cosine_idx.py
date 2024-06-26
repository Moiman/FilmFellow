import numpy as np
from numpy.typing import NDArray
from typing import List, Dict

def get_content_based_recommendations_cosine_idx(TMDB_id: int,
                                            cosine_sim_index: int,
                                            cosine_sim: NDArray[np.float64],
                                            movie_index_to_id: Dict[int, int],
                                            MovieLens_to_TMDB: Dict[int, int],
                                            TMDB_to_MovieLens: Dict[int, int],
                                        n_recommendations: int) -> List[int]:
    """
    Gives content based recommendations for a new movie, with cosine similarity
    matrix index.

    Args:
        TMDB_id: int: TMDB id of the movie, -1 if movie not found in the 
        similarity matrix.
        cosine_sim_index (int): Index of the movie in cosine similarity matrix.
        cosine sim (numpy 2-D array (float64)): Matrix were movies are compared
        to each other.
        movie_index_to_id (dict (int:int)): Matrix index mapped to movie id.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.
        n_recommendations (int): The number of recommendations given.

    Returns:
        List of integers: List of recommended movies given as TMDB id.
    """

    sim_scores = list(enumerate(cosine_sim[cosine_sim_index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:(n_recommendations+1)]
    if TMDB_id != -1:
        similar_movies = [MovieLens_to_TMDB[movie_index_to_id[i[0]]]
                        for i in sim_scores if movie_index_to_id[i[0]]
                        != TMDB_to_MovieLens[TMDB_id]]
    else:
        similar_movies = [MovieLens_to_TMDB[movie_index_to_id[i[0]]]
                        for i in sim_scores]

    return similar_movies
