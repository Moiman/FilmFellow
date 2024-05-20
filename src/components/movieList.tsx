import Link from "next/link";
import Image from "next/image";

type MovieListItem = {
  id: number;
  title: string;
  poster_path: string;
};

export const MovieList = ({ movies }: { movies: MovieListItem[] }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Link
          key={movie.id}
          href={"/movies/" + movie.id}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            width={500}
            height={500}
            alt={movie.title}
            priority
          />
        </Link>
      ))}
    </div>
  );
};
