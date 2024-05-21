import Image from "next/image";
import Link from "next/link";
import { Star } from "react-feather";

type MovieListItem = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: Date | null;
  runtime: number;
  vote_average: number;
  release_dates: { certification: string }[];
};

export const MovieGrid = ({ movies }: { movies: MovieListItem[] }) => {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <Link
          href={`/movies/${movie.id}`}
          key={movie.id}
        >
          <div className="movie">
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
                  <Star size={18} /> {movie.vote_average.toString().slice(0, 3)}
                </p>
              </div>
              <div className="info">
                <p>{movie.overview}</p>
                <div className="cyan">
                  <p>{movie.release_date?.getFullYear()}</p>
                  <p>{movie.runtime} min</p>
                  <p>{movie.release_dates[0].certification}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
