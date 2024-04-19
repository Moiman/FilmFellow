import Link from "next/link";

export type MovieListItem = {
  id: number;
  title: string;
  poster_path: string;
};

type MovieListProps = {
  movies: MovieListItem[];
};

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="movie-list">
      {movies
        ? movies.map(movie => (
            <Link
              key={movie.id}
              href={"/movies/" + movie.id}
            >
              {/* Remove this when we get working poster paths */}
              <div className="placeholder-movie-poster">{movie.title}</div>

              {/* Working image for when we have poster paths:
              <Image
                src={`${movie.poster_path}`}
                width={150}
                height={225}
                alt={movie.title}
                layout="responsive"
              />
             */}
            </Link>
          ))
        : null}
    </div>
  );
};
