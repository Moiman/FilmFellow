from rapidfuzz import process, fuzz
from typing import List

def movie_finder(title: str, movie_titles: List[str]) -> str:
    """
    Finds the closest matching movie title to title from movie_titles.

    Args:
        title (str): The title given as close to the actual title as 
        possible. For example: lord of the rings fellowship of the ring.
        movie_titles (list (str)): A list of movie titles.

    Returns:
        str: The closest match the rapidfuzz's process can find to the given 
        title string
    """
    closest_match = process.extractOne(title, movie_titles, scorer=fuzz.ratio)
    return closest_match[0]