"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Film } from "react-feather";

import { errorToast } from "@/components/errorToast";
import { setMovieRating, toggleIsWatched } from "@/services/watchedService";
import { StarRating } from "./starRating";
import { Favorite } from "./favorite";
import { Watched } from "./watched";
import { Watchlist } from "./watchlist";
import { AddToList } from "./addToList";
import { MovieWatchProviders } from "./movieWatchProviders";
import type { Movie } from "./getMovie";

export const MovieInfo = ({ movie }: { movie: Movie }) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState<number | null>(movie.userRating);
  const [watched, setWatched] = useState<boolean>(movie.isWatched);

  const setUserRating = async (stars: number | null) => {
    try {
      const newRating = stars === rating ? null : stars;
      setRating(newRating);
      await setMovieRating(movie.id, newRating);
      if (!watched) {
        toast(
          <p>
            <span className="highlight-text">{movie.title}</span> marked as watched
          </p>,
          { icon: <Film />, className: "cyan-toast" },
        );
      }
      setWatched(true);
    } catch (err) {
      errorToast(err);
    }
  };

  const toggleWatched = async () => {
    try {
      await toggleIsWatched(movie.id);
      if (watched) {
        setRating(null);
        toast(
          <p>
            <span className="highlight-text">{movie.title}</span> removed from watched
          </p>,
          { icon: <Film />, className: "yellow-toast" },
        );
      } else {
        toast(
          <p>
            <span className="highlight-text">{movie.title}</span> marked as watched
          </p>,
          { icon: <Film />, className: "cyan-toast" },
        );
      }
      setWatched(!watched);
    } catch (err) {
      errorToast(err);
    }
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
          {movie.backdropPath && (
            <Image
              alt={`${movie.title}`}
              src={`https://image.tmdb.org/t/p/w780/${movie.backdropPath}`}
              fill={true}
              sizes="100%"
              priority={true}
            />
          )}
          <div className="gradient" />
        </div>

        <div className="movie-info">
          <div className="movie-rating">
            <div
              className="current-rating"
              title="Average rating"
            >
              {movie.voteAverage ? Math.round(movie.voteAverage * 10) / 10 : null}
            </div>
            {session && (
              <StarRating
                rating={rating}
                setRating={setUserRating}
              />
            )}
          </div>

          <div className="movie-basic-data">
            <div className="movie-genres">
              {movie.genres.map(genre => (
                <p key={genre}>{genre}</p>
              ))}
            </div>

            <h2 className="h1">{movie.title}</h2>
            <div className="movie-data-row cyan">
              {movie.directors.length > 0 ? (
                <p>
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
              {movie.releaseYear ? <p title="Release year">{movie.releaseYear}</p> : null}
              {movie.ageRestrictions ? <p title="Content rating">{movie.ageRestrictions}</p> : null}
              {movie.runtime ? <p title="Runtime">{minutesToHoursAndMinutesString(movie.runtime)}</p> : null}
            </div>
            <p className="movie-description">{movie.overview}</p>
          </div>

          {session && (
            <div className="all-buttons">
              <div className="buttons">
                <AddToList
                  movieId={movie.id}
                  movieTitle={movie.title}
                />
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
                  movieTitle={movie.title}
                />
                <Watchlist
                  isInWatchlist={movie.isInWatchlist}
                  movieId={movie.id}
                  title={movie.title}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <MovieWatchProviders watchProviders={movie.watchProviders} />
    </div>
  );
};
