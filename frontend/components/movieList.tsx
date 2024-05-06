import Link from "next/link";
import Image from "next/image";

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
                  {
                    /* Replace with proper path when available:*/
                    <Image
                      src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                      width={500}
                      height={750}
                      alt={movie.title}
                    />
                  }
                </Link>
              ),
          )
        : null}
    </div>
  );
};
