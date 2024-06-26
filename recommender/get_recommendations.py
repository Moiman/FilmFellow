from flask import Flask, request, jsonify
from recommender_codes.get_recommendations_for_user \
import get_recommendations_for_user
from recommender_codes.get_recommendations_for_movie \
import get_recommendations_for_movie
from recommender_codes.get_recommendations_for_features \
import get_recommendations_for_features
from check_and_download_files \
import check_and_download_files

recommender = Flask(__name__)

@recommender.route('/recommender/user', methods=['POST'])
def user_recommendations():
    """
    Get recommendations for a user with given ratings and favourites.
    """
    try:
        data = request.get_json()
        return jsonify(get_recommendations_for_user(data.get("ratings"),
        data.get("favourites")))
    except:
        return jsonify([])

@recommender.route('/recommender/movie/existing', methods=['POST'])
def existing_movie_recommendations():
    """
    Get recommendations for a movie with given TMDB id.
    """
    try:
        data = request.get_json()
        return jsonify(get_recommendations_for_movie(data.get("TMDB_id")))
    except:
        return jsonify([])

@recommender.route('/recommender/movie/features', methods=['POST'])
def recommendations_based_on_features():
    """
    Get recommendations for a movie based on it's features.
    """
    try:
        data = request.get_json()
        return jsonify(get_recommendations_for_features(data.get("TMDB_id"), data.get("features")))
    except:
        return jsonify([])

check_and_download_files()
