from flask import Flask, request, jsonify
import json
from user.get_recommendations_for_user import get_recommendations_for_user
from movie.get_recommendations_for_movie import get_recommendations_for_movie
from movie.get_recommendations_for_new_movie import get_recommendations_for_new_movie

app = Flask(__name__)

@app.route('/recommender/user', methods=['POST'])
def user_recommendations():
    # data = json.loads(request.get_json())
    data = request.get_json()
    print(jsonify(get_recommendations_for_user(data.get("input"))))
    return jsonify(get_recommendations_for_user(data.get("input")))

@app.route('/recommender/movie/existing', methods=['POST'])
def existing_movie_recommendations():
    # data = json.loads(request.get_json())
    data = request.get_json()
    print(jsonify(get_recommendations_for_movie(data.get("input"))))
    return jsonify(get_recommendations_for_movie(data.get("input")))

@app.route('/recommender/movie/new', methods=['POST'])
def new_movie_recommendations():
    # data = json.loads(request.get_json())
    data = request.get_json()
    print(jsonify(get_recommendations_for_new_movie(data.get("input"))))
    return jsonify(get_recommendations_for_new_movie(data.get("input")))

if __name__ == '__main__':
    app.run(debug=True)