from sklearn.neighbors import NearestNeighbors
import numpy as np
from scipy.sparse import csr_matrix
from typing import List, Dict

def find_similar_movies_to_avg(
        avg: np.float64,
        matrix: csr_matrix,
        movie_index_to_id: Dict[int, int],
        MovieLens_to_TMDB: Dict[int, int],
        k: int,
        metric: str = 'cosine') -> List[int]:
    """
    Gives recommendations for an average of movies based on similar users and
    movies.

    Args:
        avg (numpy array (float64)): Average rating vector.
        matrix (numpy sparse matrix (float64)): Matrix with ratings.
        movie_index_to_id (dict (int:int)): Matrix index mapped to movie id.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        k (int): Number of nearest neighbours returned.
        metric (str): Metric of the comparison. Use either cosine or euclidean.
        Euclidean takes much longer, but is more accurate.

    Returns:
        if avg is not a zero vector:
        List of integers: List of recommended movies given as TMDB id.
        if avg is a zero vector:
        Return empty list.
    """
    if np.all(avg == 0):
        return []

    matrix = matrix.T
    neighbour_ids = []
    movie_vector = avg.reshape(1, -1)
    kNN = NearestNeighbors(n_neighbors=k+1, algorithm="brute", metric=metric)
    kNN.fit(matrix)
    neighbour = kNN.kneighbors(movie_vector, return_distance=False)
    for i in range(0,k):
        n = neighbour.item(i)
        if movie_index_to_id[n] not in MovieLens_to_TMDB.keys():
            continue
        neighbour_ids.append(MovieLens_to_TMDB[movie_index_to_id[n]])
    neighbour_ids.pop(0)
    return neighbour_ids
