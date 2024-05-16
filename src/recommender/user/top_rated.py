import numpy as np

def top_rated(ratings, favourites):
    """
    Gives the top rated movies with all the favourites.
    
    Args:
        ratings (dict: int:float64): Rated movies as TMDB id: rating -pairs.
        favourites (list: int): Favourited movies as TMDB ids.
    Returns:
        List of integers: Top rated films and all the favourites as TMDB ids.
    """
    
    top_rated = []
    
    if len(ratings) == 0:
        return favourites

    top_25_percent_rating = np.percentile(list(ratings.values()), 75)
    
    ratings = dict(sorted(ratings.items(), key=lambda item: item[1], 
                              reverse=True))
    top_10_ratings = 0
    
    if len(ratings) >= 10:
        top_10_ratings = list(ratings.values())[9]
    else:
        top_10_ratings = list(ratings.values())[-1]     
    
    if top_10_ratings > top_25_percent_rating:
        top_ratings = top_10_ratings
    else:
        top_ratings = top_25_percent_rating
        
    for movie in ratings:
        if ratings[movie] > top_ratings:
            top_rated.append(movie)
            
    top_rated.extend(favourites)
    
    return top_rated