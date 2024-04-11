"use client";

import { Dropdown } from "@/components/dropdown";
import { StarRating } from "@/components/starRating";

import { type MovieCrew, type Movies } from "@prisma/client";
import { notFound } from "next/navigation";

import { useEffect, useState } from "react";
import { Heart, Star } from "react-feather";

export default function Movie({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<Movies | null>(null);
  const [directors, setDirectors] = useState<string[]>([]);

  const [watched, setWatched] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [watchlist, setWatchlist] = useState<boolean>(false);

  const [userRating, setUserRating] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

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

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movie = await fetch("/api/movies/" + params.id).then(response => response.json());

        if (!movie.error) {
          getDirectors(movie.crew);
          setMovie(movie);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    getMovie();
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="rotating">
        <Star />
      </main>
    );
  } else if (!isLoading && !movie) {
    notFound();
  }

  if (!movie) {
    return null;
  }

  async function getDirectors(crewArray: MovieCrew[]) {
    let directorIds: number[] = [];
    let directorNames: string[] = [];

    const directors = crewArray.filter(member => member.department === "Directing" && member.job === "Director");
    directorIds = directors.map(director => director.personId);

    const directorNameResponses = await Promise.all(
      directorIds.map(directorId => fetch("/api/persons/" + directorId).then(response => response.json())),
    );

    directorNames = directorNameResponses.map(response => response.name);
    setDirectors(directorNames);
  }

  return (
    <main style={{ padding: 0 }}>
      <div className="movieContent">
        <div className="wrapper">
          <div className="img">
            <p>(image comes here)</p>
            <div className="gradient" />
          </div>
          <div className="info">
            <div className="rating">
              <div className="currentRating">{movie.vote_average ? movie.vote_average.toFixed(1) : null}</div>
              <StarRating onChange={handleRatingChange} />
            </div>
            <div className="basicData">
              <h1>{movie.title}</h1>

              <div className="data-row">
                {directors.length > 0 ? <p className="yellow">Directed by {directors.join(", ")}</p> : null}
                <p className="cyan">
                  {movie.release_date ? new Date(movie.release_date as Date).getFullYear().toString() : null}
                </p>
                <p className="cyan">(Age restriction)</p>
                <p className="cyan">{movie.runtime ? movie.runtime : null} min</p>
              </div>

              <p>{movie.overview}</p>
            </div>

            <div className="allButtons">
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
              <div className="buttons2">
                <button
                  className={favorite ? "button-transparent pink" : "button-transparent"}
                  onClick={() => setFavorite(!favorite)}
                >
                  <Heart size={30} />
                  Add to favorites
                </button>
                <button
                  className={watchlist ? "button-transparent yellow" : "button-transparent"}
                  onClick={() => setWatchlist(!watchlist)}
                >
                  <Star size={30} />
                  Add to watchlist
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
    </main>
  );
}
