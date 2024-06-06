import { notFound } from "next/navigation";
import { getList } from "@/services/listService";
import { MovieList } from "@/components/movieList";

export default async function ListPage({ params }: { params: { listId: string } }) {
  const list = await getList(params.listId);

  if (!list) {
    notFound();
  }

  const movies = list.listMovies.map(movie => movie.movie);

  if (movies.length > 0) {
    return <MovieList movies={movies} />;
  } else {
    return <p>No movies yet</p>;
  }
}
