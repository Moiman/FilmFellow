import numpy as np
from numpy.typing import NDArray
from typing import List, Dict

def get_content_based_recommendations(TMDB_id: int,
                                      cosine_sim: NDArray[np.float64],
                                      movie_id_to_index: Dict[int, int],
                                      movie_index_to_id: Dict[int, int],
                                      MovieLens_to_TMDB: Dict[int, int],
                                      TMDB_to_MovieLens: Dict[int, int],
                                      n_recommendations: int) -> List[int]:
    """
    Gives content based recommendations for a movie, with id that matches
    TMDB_id.

    Args:
        TMDB_id (int): TMDB id of the movie you want recommendations for.
        cosine sim (numpy 2-D array (float64)): Matrix were movies are compared
        to each other.
        movie_id_to_index (dict (int:int)): Movie id mapped to matrix index.
        movie_index_to_id (dict (int:int)): Matrix index mapped to movie id.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.
        n_recommendations (int): The number of recommendations given.

    Returns:
        List of integers: List of recommended movies given as TMDB id.
    """

    index = movie_id_to_index[TMDB_to_MovieLens[TMDB_id]]
    sim_scores = list(enumerate(cosine_sim[index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[0:(n_recommendations+1)]
    similar_movies = [MovieLens_to_TMDB[movie_index_to_id[i[0]]]
                      for i in sim_scores if movie_index_to_id[i[0]]
                      != TMDB_to_MovieLens[TMDB_id]]

    return similar_movies
