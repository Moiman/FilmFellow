"use client";

import { useState } from "react";
import { Heart, Star } from "react-feather";

import { StarRating } from "./starRating";
import { Dropdown } from "../dropdown";

import type { Movie } from "@/app/movies/[id]/page";

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
  movie: Movie;
}

export const MovieInfo = ({ movie }: MovieInfoProps) => {
  const [watched, setWatched] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [watchlist, setWatchlist] = useState<boolean>(false);

  const [userRating, setUserRating] = useState<number>(0);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const minutesToHoursAndMinutesString = (totalMinutes: number): string => {
    if (totalMinutes < 60) {
      return `${totalMinutes} min`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours} h ${minutes} min`;
    }
  };

  return (
    <div className="movie-content">
      <div className="movie-wrapper">
        <div className="image-wrapper">
          {/* Working image for when we have backdrop paths:
          <Image
            alt={`${movie.title}`}
            src={`${movie.backdropPath}`}
            width={500}
            height={500}
          />
          */}
          <div className="gradient" />
        </div>

        <div className="movie-info">
          <div className="movie-rating">
            <div className="current-rating">{movie.voteAverage ? Math.round(movie.voteAverage * 10) / 10 : null}</div>
            <StarRating onChange={handleRatingChange} />
          </div>
          <div className="movie-basic-data">
            <h1>{movie.title}</h1>

            <div className="movie-data-row">
              {movie.directors.length > 0 ? <p className="yellow">Directed by {movie.directors.join(", ")}</p> : null}
              {movie.releaseYear ? <p className="cyan">{movie.releaseYear}</p> : null}
              {movie.ageRestrictions ? <p className="cyan">{movie.ageRestrictions}</p> : null}
              {movie.runtime ? <p className="cyan">{minutesToHoursAndMinutesString(movie.runtime)}</p> : null}
            </div>
            <p className="movie-description">{movie.overview}</p>
          </div>

          {/* Buttons not working yet, functionality comes later */}
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
      <div className="movie-streaming-sites">
        <h6>Watch at:</h6>
        <p style={placeholderIcon}>icon</p>
        <p style={placeholderIcon}>icon</p>
        <p style={placeholderIcon}>icon</p>
      </div>
    </div>
  );
};
