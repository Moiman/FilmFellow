import { notFound } from "next/navigation";
import { getList } from "@/services/listService";
import { MovieCatalogue } from "../movieCatalogue";

export default async function CataloguePage({ params }: { params: { listId: string } }) {
  const id = Number(params.listId);

  const list = await getList(id);

  if (!list) {
    notFound();
  }

  const movies = list.listMovies.map(movie => movie.movie);

  return <MovieCatalogue movies={movies} />;
}
