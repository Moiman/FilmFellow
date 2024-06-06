import { notFound } from "next/navigation";
import { getList } from "@/services/listService";
import { MovieList } from "@/components/movieList";

export default async function ListPage({ params }: { params: { listId: string } }) {
  const list = await getList(params.listId);

  if (!list) {
    notFound();
  }

  const movies = list.listMovies.map(movie => movie.movie);

  return <>{movies.length > 0 ? <MovieList movies={movies} /> : <p>No movies yet</p>}</>;
}
