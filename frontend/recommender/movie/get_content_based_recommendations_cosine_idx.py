def get_content_based_recommendations_cosine_idx(cosine_sim_index, 
                                                  cosine_sim,
                                                  movie_index_to_id,
                                                  MovieLens_to_TMDB,
                                                  n_recommendations):
    """
    Gives content based recommendations for a new movie, with cosine similarity
    matrix index.
    
    Args:
        cosine_sim_index (int): Index of the movie in cosine similarity matrix.
        cosine sim (numpy 2-D array (float64)): Matrix were movies are compared
        to each other.
        movie_index_to_id (dict (int:int)): Matrix index mapped to movie id.
        MovieLens_to_TMDB (dict (int:int)): MovieLens id mapped to TMDB id.
        n_recommendations (int): The number of recommendations given.
 
    Returns:
        List of integers: List of recommended movies given as TMDB id.
    """

    sim_scores = list(enumerate(cosine_sim[cosine_sim_index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:(n_recommendations+1)]
    similar_movies = [MovieLens_to_TMDB[movie_index_to_id[i[0]]] 
                      for i in sim_scores]
    
    return similar_movies