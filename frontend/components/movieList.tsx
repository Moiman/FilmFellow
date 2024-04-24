import Link from "next/link";

type MovieListItem = {
  id: number;
  title: string;
  poster_path: string;
};

type MovieListProps = {
  movies: (MovieListItem | null)[];
};

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="movie-list">
      {movies.length > 0
        ? movies.map(
            movie =>
              movie && (
                <Link
                  key={movie.id}
                  href={"/movies/" + movie.id}
                >
                  {/* Placeholder until we get working poster paths */}
                  <div className="placeholder-movie-poster">{movie.title}</div>

                  {/* Working image for when we have poster paths:
                  <Image
                    src={`${movie.poster_path}`}
                    width={500}
                    height={500}
                    alt={movie.title}
                  />
                  */}
                </Link>
              ),
          )
        : null}
    </div>
  );
};
