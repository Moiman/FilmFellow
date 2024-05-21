import numpy as np
from scipy.sparse import csr_matrix
from typing import List, Dict
from sklearn.neighbors import NearestNeighbors

def find_similar_movies_coll(
        TMDB_id: int, 
        matrix: csr_matrix, 
        movie_id_to_index: Dict[int, int], 
        movie_index_to_id: Dict[int, int], 
        MovieLens_to_TMDB: Dict[int, int],
        TMDB_to_MovieLens: Dict[int, int],
        k: int, 
        metric: str = 'cosine') -> List[int]:
    """
    Gives recommendations for a movie based on similar users and movies.
    
    Args:
        TMDB_id (int): TMDB id of the movie you want recommendations for.
        matrix (numpy sparse matrix (float64)): Matrix with ratings.
        movie_id_to_index (dict (int:int)): Movie id mapped to matrix index.
        movie_index_to_id (dict (int:int)): Matrix index mapped to movie id.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.
        k (int): Number of nearest neighbours returned.
        metric (str): Metric of the comparison. Use either cosine or euclidean.
        Euclidean takes much longer, but is more accurate.
 
    Returns:
        List of integers: List of recommended movies given as TMDB id.
    """
    
    matrix = matrix.T 
    neighbour_ids = []
    
    index = movie_id_to_index[TMDB_to_MovieLens[TMDB_id]]
    movie_vector = matrix[index]
    if isinstance(movie_vector, (np.ndarray)):
        movie_vector = movie_vector.reshape(1,-1)
    kNN = NearestNeighbors(n_neighbors=k+1, 
                           algorithm="brute", 
                           metric=metric) 
                                                                              
    kNN.fit(matrix)
    neighbour = kNN.kneighbors(movie_vector, 
                               return_distance=False)
    for i in range(0,k+1):
        n = neighbour.item(i)
        if movie_index_to_id[n] not in MovieLens_to_TMDB.keys():
            continue
        neighbour_ids.append(MovieLens_to_TMDB[movie_index_to_id[n]])
    neighbour_ids.pop(0)
    return neighbour_ids