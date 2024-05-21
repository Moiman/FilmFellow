def get_num_recommendations(n_recommendations: int):
    """
    Gives the number of collaborative and content based recommendations.
    There is 80,000+ movies in the collaborative dataset and only 1800+
    movies in the content based filtering dataset. I decided that the maximum
    value for content based recommendations is 40: roughly 2 % of all the 
    movies in the dataset. 
    
    Args:.
        n_recommendations (int): The number of recommendations given. Needs to
        be a multiple of two: 2, 4, 6, 8, 10, 12, ...
    
    Returns:
        Tuple of integers: The number of collaborative and content based 
        recommendations.
    """
    content_based_recommendations = int(min(n_recommendations/2, 40))
    collaborative_recommendations = n_recommendations - \
        content_based_recommendations
    return collaborative_recommendations, content_based_recommendations