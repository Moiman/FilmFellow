import Image from "next/image";
import { Star } from "react-feather";

type MovieListItem = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: Date | null;
  runtime: number;
  vote_average: number;
};

export const MovieGrid = ({ movies }: { movies: MovieListItem[] }) => {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <div
          key={movie.id}
          className="movie"
        >
          <div className="poster">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              width={150}
              height={300}
              alt={movie.title}
              priority
            />
          </div>
          <div className="movie-info">
            <div className="title">
              <h4>{movie.title}</h4>
              <p className="yellow">
                {movie.vote_average.toString().slice(0, 3)} <Star size={16} />
              </p>
            </div>
            <div className="info">
              <p>{movie.overview}</p>
              <div className="cyan">
                <p>{movie.release_date?.getFullYear()}</p>
                <p>{movie.runtime} min</p>
                <p>???</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
