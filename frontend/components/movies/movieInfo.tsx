import { Movies } from "@prisma/client";
import { useState } from "react";
import { StarRating } from "./starRating";
import { Dropdown } from "../dropdown";
import { Heart, Star } from "react-feather";

const placeholderIcon = {
  backgroundColor: "rgba(0,0,0,0.25)",
  color: "rgba(255,255,255,0.35)",
  padding: "5px",
  aspectRatio: 1,
  display: "flex",
  alignItems: "center",
  fontSize: "0.75rem",
  borderRadius: "50%",
};

interface MovieInfoProps {
  movie: Movies;
  directors: string[];
}

export const MovieInfo = ({ movie, directors }: MovieInfoProps) => {
  const [watched, setWatched] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [watchlist, setWatchlist] = useState<boolean>(false);

  const [userRating, setUserRating] = useState<number>(0);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <div className="movie-content">
      <div className="wrapper">
        {/* Img not working until we have posters to path to, can be tested with any img url until then */}
        <div
          className="img"
          style={{
            background: `URL(${movie.poster_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="gradient" />
        </div>

        <div className="info">
          <div className="rating">
            <div className="current-rating">{movie.vote_average ? movie.vote_average.toFixed(1) : null}</div>
            <StarRating onChange={handleRatingChange} />
          </div>
          <div className="basic-data">
            <h1>{movie.title}</h1>

            <div className="data-row">
              {directors.length > 0 ? <p className="yellow">Directed by {directors.join(", ")}</p> : null}
              <p className="cyan">
                {movie.release_date ? new Date(movie.release_date as Date).getFullYear().toString() : null}
              </p>
              {/* No data for age restrictions yet */}
              <p className="cyan">(?)</p>
              <p className="cyan">{movie.runtime ? movie.runtime : null} min</p>
            </div>
            <p className="movie-description">{movie.overview}</p>
          </div>

          <div className="all-buttons">
            <div className="buttons">
              <Dropdown
                button={<button>Add to list</button>}
                width={200}
              >
                <button className="dropdown-item">Example list 1</button>
                <button className="dropdown-item">Example list 2</button>
                <button className="dropdown-item">Example list 3</button>
              </Dropdown>
              <button
                className={watched ? "button-pink" : ""}
                onClick={() => setWatched(!watched)}
              >
                {watched ? "Remove from watched" : "Mark as watched"}
              </button>
            </div>
            <div className="transparent-buttons">
              <button
                className={favorite ? "button-transparent pink" : "button-transparent"}
                onClick={() => setFavorite(!favorite)}
              >
                <Heart size={24} />
                {favorite ? "Remove from favorites" : "Add to favorites"}
              </button>
              <button
                className={watchlist ? "button-transparent yellow" : "button-transparent"}
                onClick={() => setWatchlist(!watchlist)}
              >
                <Star size={24} />
                {watchlist ? "Remove from watchlist" : "Add to watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="websites">
        <h6>Watch at:</h6>
        <p style={placeholderIcon}>icon</p>
        <p style={placeholderIcon}>icon</p>
        <p style={placeholderIcon}>icon</p>
      </div>
    </div>
  );
};
