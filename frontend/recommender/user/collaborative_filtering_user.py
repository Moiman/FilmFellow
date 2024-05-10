from find_similar_movies_coll import find_similar_movies_coll

def collaborative_filtering_user(TMDB_id,
                            n_recommendations,
                            MovieLens_to_TMDB,
                            TMDB_to_MovieLens,
                            movie_id_to_index,
                            movie_index_to_id,
                            matrix
                            ):
    """
    Gives collaborative filtering recommendations for a movie, with id that 
    matches TMDB_id.
    
    Args:
        TMDB_id (int): TMDB id of the movie you want recommendations for.
        n_recommendations (int): The number of recommendations given.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        TMDB_to_MovieLens (dict (int:int)): TMDB id mapped to MovieLens id.
        movie_id_to_index (dict (int:int)): MovieLens id mapped to matrix 
        index.
        movie_index_to_id (dict (int:int)): Matrix index mapped to  MovieLens 
        id.
        matrix (Numpy sparse matrix: float16): Matrix with users as columns and
        movies as rows. User i rating for movie j is the element ji.
 
    Returns:
        if movie is in the sparse matrix:
        List of integers: List of recommended movies given as TMDB id.
        if movie is not in the sparse matrix:
        returns an empty list.
    """    
    
    if TMDB_to_MovieLens[TMDB_id] not in movie_id_to_index.keys():
        return []

    recommendations = find_similar_movies_coll(
                            TMDB_id, 
                            matrix, 
                            movie_id_to_index, 
                            movie_index_to_id, 
                            MovieLens_to_TMDB, 
                            TMDB_to_MovieLens, 
                            n_recommendations, 
                            metric='euclidean')
    
    return recommendations