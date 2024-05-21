import numpy as np
from recommender_codes.manual_testing_and_debugging.movie_finder \
import movie_finder

def get_TMDB_id_from_movie_name(
        movie_name: str) -> str:
    """
    Gives the closest match to movie name found in movie_titles list.
    
    Args:
        movie_name (str): The movie name. Try to get as close to the actual 
        name as possible. The release year can be added in the end inside 
        parentheses.
    
    Returns:
        str: The closest match the movie_finder can find to the given 
        title string
    """
    
    if type(movie_name) != str:
        print("The name must be a string!")
        return
    
    movie_title_to_TMDB_id = np.load(
        "recommender_files/manual_testing_and_debugging" +
        "/movie_title_to_TMDB_id.npy", 
        allow_pickle=True).item()
    movie_titles = np.load("recommender_files/manual_testing_and_debugging" +
    "/movie_titles_list.npy", allow_pickle=True)
    
    movie_match = movie_finder(movie_name, movie_titles)
    
    return movie_match, movie_title_to_TMDB_id[movie_match]
