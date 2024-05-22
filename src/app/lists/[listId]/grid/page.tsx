import { notFound } from "next/navigation";
import { getList } from "@/services/listService";
import { MovieGrid } from "../movieGrid";

export default async function GridPage({ params }: { params: { listId: string } }) {
  const id = Number(params.listId);

  const list = await getList(id);

  if (!list) {
    notFound();
  }

  const movies = list.listMovies.map(movie => movie.movie);

  return <MovieGrid movies={movies} />;
}
