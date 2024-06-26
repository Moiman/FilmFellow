import numpy as np
import random
from typing import List, Dict
from scipy.sparse import csr_matrix

def average_of_movies(
        ratings: Dict[int, float],
        favourites: List[int],
        matrix: csr_matrix,
        movie_id_to_index: Dict[int, int],
        TMDB_to_MovieLens: Dict[int, int]
        ) -> List[int]:
    """
    Calculates the average vector from the most liked movies in ratings dict
    and list of favourite movies.

    Args:
        ratings (dict (int:float)): TMDB id mapped to the movies rating.
        favourites (list: int): Favourite movies as TMDB ids.
        matrix (numpy sparse matrix (float64)): Matrix with ratings.
        movie_id_to_index (dict (int:int)): Movie id mapped to matrix index.
        as the matrix has for each movie.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.

    Returns:
        If there is better than average ratings and/or favourites:
        Numpy array of float64s: The average movie vector calculated from the
        most liked films (10 random chosen from the better movies, if more 
        than 10 better than average movies) in the ratings (better than 
        average) and all the favourites.
        If there is no better than average ratings nor favourites:
        Returns an empty list.

    """
    avg = np.zeros(matrix.shape[0])
    avg = avg.reshape(matrix.shape[0], 1)
    ratings_array = np.array(list(ratings.values()))

    if len(ratings) != 0:
        mean_rating = ratings_array.mean()
        max_rating = ratings_array.max()
        if mean_rating == max_rating and len(favourites) == 0:
            return []

    rated_movies = list(ratings.keys())
    random.shuffle(rated_movies)
    movie_weights = 0
    count_better_than_avg_movies = 0

    for movie in rated_movies:
        if count_better_than_avg_movies > 10:
            break
        movie_id = TMDB_to_MovieLens[movie]
        index = movie_id_to_index[movie_id]
        the_movie = matrix[:, index]
        if mean_rating != max_rating:
            movie_weight = max(0, (ratings[movie] - mean_rating)
                           / (max_rating - mean_rating))
            if movie_weight > 0:
                count_better_than_avg_movies += 1
        else:
            movie_weight = 0
        movie_weights += movie_weight
        avg += movie_weight*the_movie

    for movie in favourites:
        movie_id = TMDB_to_MovieLens[movie]
        index = movie_id_to_index[movie_id]
        the_movie = matrix[:, index]
        movie_weights += 1
        avg += the_movie

    if movie_weights == 0:
        return avg

    return avg / movie_weights
