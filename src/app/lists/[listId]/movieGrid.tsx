type MovieListItem = {
  id: number;
  title: string;
  poster_path: string;
};

export const MovieGrid = ({ movies }: { movies: MovieListItem[] }) => {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <div
          key={movie.id}
          className="movie"
        >
          {movie.title}
        </div>
      ))}
    </div>
  );
};
