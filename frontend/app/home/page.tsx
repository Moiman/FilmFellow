import { MovieList } from "@/app/home/homeMovieList";

export default async function home({ searchParams }: { searchParams?: { genre: string } }) {
  return (
    <main>
      <MovieList selectedGenre={searchParams?.genre} />
    </main>
  );
}
