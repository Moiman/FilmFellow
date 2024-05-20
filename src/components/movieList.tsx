import Link from "next/link";
import Image from "next/image";

type MovieListItem = {
  id: number;
  title: string;
  poster_path: string | null;
};

type MovieListProps = {
  movies: MovieListItem[];
};

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Link
          key={movie.id}
          href={"/movies/" + movie.id}
        >
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              width={500}
              height={500}
              alt={movie.title}
              priority
            />
          )}
        </Link>
      ))}
    </div>
  );
};
