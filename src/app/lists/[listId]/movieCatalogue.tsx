import Link from "next/link";

type MovieCatalogueItem = {
  id: number;
  title: string;
  release_date: Date | null;
  runtime: number;
  vote_average: number;
};

export const MovieCatalogue = ({ movies }: { movies: MovieCatalogueItem[] }) => {
  return (
    <div className="movie-catalogue">
      <div className="movie">
        <h3 className="title">Title</h3>
        <h3 className="title">Year</h3>
        <h3 className="title">Length</h3>
        <h3 className="title">Rating</h3>
        <h3 className="title">Score</h3>
      </div>

      {movies.map(movie => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
        >
          <div className="movie">
            <p>{movie.title}</p>
            <p>{movie.release_date?.getFullYear()}</p>
            <p>{movie.runtime} min</p>
            <p>???</p>
            <p>{movie.vote_average}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
