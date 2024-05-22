import Link from "next/link";

type MovieCatalogueItem = {
  id: number;
  title: string;
  release_date: Date | null;
  runtime: number;
  vote_average: number;
  release_dates: { certification: string }[];
};

export const MovieCatalogue = ({ movies }: { movies: MovieCatalogueItem[] }) => {
  return (
    <div className="movie-catalogue">
      <div className="title-row">
        <h3 className="title">Title</h3>
        <h3 className="title">Year</h3>
        <h3 className="title">Length</h3>
        <h3 className="title">Rating</h3>
        <h3 className="title">Score</h3>
      </div>

      {movies.map(movie => (
        <Link
          className="movie"
          key={movie.id}
          href={`/movies/${movie.id}`}
        >
          <p>{movie.title}</p>
          <p>{movie.release_date ? movie.release_date.getFullYear() : "unknown"}</p>
          <p>{movie.runtime} min</p>
          <p>{movie.release_dates[0].certification}</p>
          <p className="yellow"> {movie.vote_average.toString().slice(0, 3)}</p>
        </Link>
      ))}
    </div>
  );
};
