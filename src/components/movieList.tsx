import Link from "next/link";
import Image from "next/image";

type MovieListItem = {
  id: number;
  title: string;
  poster_path: string | null;
};

export const MovieList = ({ movies }: { movies: MovieListItem[] }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Link
          key={movie.id}
          href={"/movies/" + movie.id}
          aria-label={movie.title}
        >
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              width={500}
              height={500}
              alt={movie.title}
              priority
            />
          ) : (
            <div className="poster-path-placeholder">{movie.title}</div>
          )}
        </Link>
      ))}
    </div>
  );
};
