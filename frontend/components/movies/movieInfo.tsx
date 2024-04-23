import { Dropdown } from "../dropdown";
import { StarRating } from "./starRating";
import { Favorite } from "./favorite";
import { Watched } from "./watched";
import { Watchlist } from "./watchlist";
import { getIsFavorite } from "@/services/favoriteService";
import type { Movie } from "@/app/movies/[id]/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

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

export const MovieInfo = async ({ movie }: { movie: Movie }) => {
  const session = await getServerSession(authOptions);

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
        {/* Img not working until we have posters to path to, can be tested with any img url until then */}
        <div
          className="img"
          style={{
            background: `URL(${movie.backdropPath})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="gradient" />
        </div>

        <div className="movie-info">
          <div className="movie-rating">
            <div className="current-rating">{movie.voteAverage ? Math.round(movie.voteAverage * 10) / 10 : null}</div>
            {session && <StarRating />}
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
                <Watched />
              </div>
              <div className="transparent-buttons">
                <Favorite
                  movieId={movie.id}
                  isFavorite={await getIsFavorite(movie.id)}
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
