from typing import List

def feature_formatter(features: List[str]) -> List[str]:
    """
    Transforms the features to align them with the formatting of the dataframe
    columns: Genres capitalized, except IMAX all caps, Sci-Fi and Film-Noir.
    Tags are all lower case.

    Args:
        features (list: (str)): The movies features listed in no particular
        order.

    Returns:
        list of strings: The movie features in right format.
    """

    genres = ["drama",
              "comedy",
              "thriller",
              "romance",
              "action",
              "documentary",
              "horror",
              "crime",
              "adventure",
              "sci-fi",
              "animation",
              "children",
              "mystery",
              "fantasy",
              "war",
              "western",
              "film-noir",
              "imax"]

    for i in range(len(features)):
        if features[i].lower() in genres:
            if features[i].lower() == "imax":
                features[i] = "IMAX"
            elif features[i].lower() == "sci-fi":
                features[i] = "Sci-Fi"
            elif features[i].lower() == "film-noir":
                features[i] = "Film-Noir"
            else:
                features[i] = features[i].capitalize()
        else:
            features[i] = features[i].lower()

    return features
