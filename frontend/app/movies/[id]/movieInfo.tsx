"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { StarRating } from "./starRating";
import { Favorite } from "./favorite";
import { Watched } from "./watched";
import { Watchlist } from "./watchlist";
import { Dropdown } from "@/components/dropdown";
import type { Movie } from "@/app/movies/[id]/page";
import { setMovieRating, toggleIsWatched } from "@/services/watchedService";

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

export const MovieInfo = ({ movie }: { movie: Movie }) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState<number | null>(movie.userRating);
  const [watched, setWatched] = useState<boolean>(movie.isWatched);

  const setUserRating = async (stars: number | null) => {
    const newRating = stars === rating ? null : stars;
    setRating(newRating);
    await setMovieRating(movie.id, newRating);
    setWatched(true);
  };

  const toggleWatched = async () => {
    await toggleIsWatched(movie.id);
    if (watched) {
      setRating(null);
    }
    setWatched(!watched);
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
            {session && (
              <StarRating
                rating={rating}
                setRating={setUserRating}
              />
            )}
          </div>
          <div className="movie-basic-data">
            <h2 className="h1">{movie.title}</h2>

            <div className="movie-data-row">
              {movie.directors.length > 0 ? (
                <p className="yellow">
                  Directed by{" "}
                  {movie.directors
                    .map<React.ReactNode>(director => (
                      <Link
                        href={"/persons/" + director.personId}
                        key={director.personId}
                      >
                        {director.name}
                      </Link>
                    ))
                    .reduce((links, directorLink) => [links, ", ", directorLink])}
                </p>
              ) : null}
              {movie.releaseYear ? <p className="cyan">{movie.releaseYear}</p> : null}
              {movie.ageRestrictions ? <p className="cyan">{movie.ageRestrictions}</p> : null}
              {movie.runtime ? <p className="cyan">{minutesToHoursAndMinutesString(movie.runtime)}</p> : null}
            </div>
            <p className="movie-description">{movie.overview}</p>
          </div>

          {/* Buttons not working yet, functionality comes later */}
          {session && (
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
                <Watched
                  watched={watched}
                  toggleWatched={toggleWatched}
                  setUserRating={setUserRating}
                  movieTitle={movie.title}
                />
              </div>
              <div className="transparent-buttons">
                <Favorite
                  movieId={movie.id}
                  isFavorite={movie.isFavorite}
                />
                <Watchlist />
              </div>
            </div>
          )}
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
