import numpy as np

def vectorize_movie(movie_features, features):
    """
    Makes a vector of the features of the movie, which fits the dataframe with
    movies as rows and features as columns. If feature exists in the film: 
    value 1 (if genre feature) or 3 (if tag feature). If feature doesn't exist,
    then value is 0.' It seems to give better recommendations when tags are 
    weighted higher.

    Args:
        movie_features (list: str): The features listed in no particular order.
        features (list: (str)): All the features that are possible (columns 
        of the dataframe).

    Returns:
        numpy array of integers: The movie vector with values 0, 1 and 3.
    """
    
    genres = ["Drama", 
              "Comedy", 
              "Thriller", 
              "Romance", 
              "Action", 
              "Documentary", 
              "Horror", 
              "Crime", 
              "Adventure", 
              "Sci-Fi", 
              "Animation", 
              "Children", 
              "Mystery", 
              "Fantasy", 
              "War", 
              "Western", 
              "Film-Noir", 
              "IMAX"]
    
    movie_vector = np.zeros(len(features))
    genre_count = len(genres)
    
    for i in range(len(features)):
        if features[i] == "(no genres listed)":
            for genre in genres:
                if genre not in movie_features:
                    genre_count -= 1
            if genre_count == 0:
                movie_vector[i] = 1
        if features[i] in movie_features:
            if features[i] in genres:
                movie_vector[i] = 1
            else:
                movie_vector[i] = 3
                
    return movie_vector
                
            