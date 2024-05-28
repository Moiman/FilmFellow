import { notFound } from "next/navigation";
import { getList } from "@/services/listService";
import { MovieCatalogue } from "../movieCatalogue";

export default async function CataloguePage({ params }: { params: { listId: string } }) {
  const list = await getList(params.listId);

  if (!list) {
    notFound();
  }

  const movies = list.listMovies.map(movie => movie.movie);

  return <MovieCatalogue movies={movies} />;
}
