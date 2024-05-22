from flask import Flask, request, jsonify
import json
from recommender_codes.get_recommendations_for_user \
import get_recommendations_for_user
from recommender_codes.get_recommendations_for_movie \
import get_recommendations_for_movie
from recommender_codes.get_recommendations_for_features \
import get_recommendations_for_features

recommender = Flask(__name__)

@recommender.route('/recommender/user', methods=['POST'])
def user_recommendations():
    data = request.get_json()
    return jsonify(get_recommendations_for_user(data.get("ratings"), 
    data.get("favourites")))

@recommender.route('/recommender/movie/existing', methods=['POST'])
def existing_movie_recommendations():
    data = request.get_json()
    return jsonify(get_recommendations_for_movie(data.get("TMDB_id")))

@recommender.route('/recommender/movie/features', methods=['POST'])
def recommendations_based_on_features():
    data = request.get_json()
    return jsonify(get_recommendations_for_features(data.get("features")))

if __name__ == '__main__':
    recommender.run(host='0.0.0.0', port=5000)