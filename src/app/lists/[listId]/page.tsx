import { notFound } from "next/navigation";
import { getList } from "@/services/listService";
import { MovieList } from "@/components/movieList";

export default async function ListPage({ params }: { params: { listId: string } }) {
  const id = Number(params.listId);

  const list = await getList(id);

  if (!list) {
    notFound();
  }

  const movies = list.listMovies.map(movie => movie.movie);

  return <MovieList movies={movies} />;
}
